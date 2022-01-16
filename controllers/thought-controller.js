const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //GET Thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought with this id!' })
          return;
        }
        res.json(thoughtData)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json(err)
      });
  },


  // createThought
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      }).then(dbThoughtData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thoughts with this particular ID!' });
          return;
        }
        res.json(dbThoughtData)
      }).catch(err => res.json(err));
  },

  // update Thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  //DELETE Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(deletedThought => {
        if (!deletedThought) {
          res.status(404).json({ message: 'No thought with this id!' });
          return;
        }
        res.json(deletedThought);
      })
      .catch(err => {
        console.log(err)
        res.status(400).json(err)
      });
  },

  //addReaction to an already created thought 
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No reaction found with this id!' });

        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  //removeReaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No reaction found with this id!' });

        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;