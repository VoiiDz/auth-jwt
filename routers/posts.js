const router = require('express').Router();
const auth = require('./privateRoute');


router.get('/', auth, (req, res) => {
    res.json({
        posts: {
            title: 'first Post', 
            desc: 'private data',
            user: req.user
        }
    });
});

module.exports = router;