const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    const token = jwt.sign({ id: req.user._id }, 'tu_clave_secreta', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;