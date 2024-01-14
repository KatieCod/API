var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.viewCount) {
        req.session.viewCount = 1;
    } else {
        req.session.viewCount += 1;
    }
    res.json(req.session.viewCount + '<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
})

module.exports = router;