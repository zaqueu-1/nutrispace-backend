const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');


router.post('/login', async (req, res) => {
    const user = await User.findOne({ userEmail: req.body.userEmail })

    if (!user) {
        return res.status(400).send('Email ou senha incorretos!')
    } 

    const validPassword = await bcrypt.compare(req.body.pass, user.pass)

    if (!validPassword) {
        return res.status(400).send('Email ou senha incorretos!')
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

    res.header('auth-token', token).send(token)
})
        

module.exports = router;
