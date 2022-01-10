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
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//api/users/:userId/Reactions/

router
    .route('/:id/Reactions/:ReactionsId')
    .post(addReaction)
    .delete(deleteReaction);


module.exports = router;