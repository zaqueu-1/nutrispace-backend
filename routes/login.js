const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User: UserModel } = require('../models/User')


router.post('/login', async (req, res) => {
    try {
    const user = await UserModel.findOne({ userEmail: req.body.userEmail })

    if (!user) {
        return res.status(400).send('Email ou senha incorretos!')
    } 

    const validPassword = await bcrypt.compare(req.body.pass, user.pass)

    if (!validPassword) {
        return res.status(400).send('Email ou senha incorretos!')
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

    res.set({
        'auth-token': token,
        'user-id': user._id
      }).status(200).json({ token, userId: user._id })
    } catch (err) {
        res.status(500).json({ message: err.message })
      }
})
        
module.exports = router;
