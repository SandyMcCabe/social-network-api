const router = require('express').Router(); 

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/Thoughts/:id
router
    .route('/:thoughtid')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//api/thoughts/:thoughtId/reactions/
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

//api/thoughts/:thoughtId/reactions/:reactionid
router
    .route('/:thoughtId/reactions/:reactionid')
    .delete(deleteReaction);


module.exports = router;