const router = require('express').Router(); const router = require('express').Router();

const {
    getAllThoughts,
    getThougtById,
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
    .get(getThougtById)
    .put(updateThought)
    .delete(deleteThought);

//api/users/:userId/Reactions/

router
    .route('/:id/Reactions/:ReactionsId')
    .post(addReaction)
    .delete(deleteReaction);


module.exports = router;