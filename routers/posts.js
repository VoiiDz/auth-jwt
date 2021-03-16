const router = require('express').Router();


router.get('/', (req, res) => {
    res.json({
        posts: {
            title: 'first Post', desc: 'private data'
        }
    });
});

module.exports = router;