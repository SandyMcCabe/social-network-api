const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThought(req, res) {
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

  // get one Thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createThought
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
          return User.findOneAndUpdate(
              { username : body.username },
              { $push: {thoughts: _id}},
              { new: true }
          );
      }).then(dbThoughtData => {
        if(!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
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
  
  // delete Thought and user it's associated to
  deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
      .then(deletedThought => {
          if(!deletedThought) {
              return res.status(404).json({ message: 'No Thoughts found with this id'})
            } return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: _id}},
                { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User found with this Id'})
                    return;
                } res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
        
    //addReaction to an already created thought 
    addReaction({ params, body }, res) {
          Thought.findOneAndUpdate(
              { username: body.username }, 
              { $push: {reactions: body}}, 
              { new: true, runValidators: true })
              .populate({
                path: 'reactions',
                select: '-__v'
              })
              .select('-__v')
            .then(dbThoughtData => {
              if (!dbThoughtData) {
                res.status(404).json({ message: 'No reaction found with this id!' });
                return;
              }
              res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
        },
        
    //deletReaction
    deleteReaction({ params }, res) {
              Thought.findOneAndUpdate(
                  { _id: params.thoughtId }, 
                  { $pull: { reactions: { reactionId: params.reactionId }}}, 
                  { new: true })
                .then(dbThoughtData => {
                  if (!dbThoughtData) {
                    res.status(404).json({ message: 'No reaction found with this id!' });
                    return;
                  }
                  res.json(dbThoughtData);
                })
                .catch(err => res.json(err));
            },
};

module.exports = thoughtController;