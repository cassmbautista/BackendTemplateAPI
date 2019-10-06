// Initialize express router
let router = require('express').Router();



// Import contact controller
var contactController = require('../controllers/contactController');
// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);

router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);


    
// Export API routes
module.exports = router;