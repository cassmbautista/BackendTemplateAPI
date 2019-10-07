// Initialize express router
let router = require('express').Router();

// Import people controller
let peopleController = require('../controllers/peopleController');

// Setup People routes
router.route('/people')
    .get(peopleController.get)
    .post(peopleController.post);

router.route('/people/:id')
    .get(peopleController.getById)
    .put(peopleController.put)
    .delete(peopleController.delete);

   
// Export API routes
module.exports = router;