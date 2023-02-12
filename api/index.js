require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

app.use(cors())
app.use(express.json())

const conn = require('../db/conn')
conn();

const routes = require('../routes/router')

app.use('/api', routes)

app.listen(9001, function() {
    console.log('🪓')
})

app.get('/', (req,res) => {
    res.send('🪓🪓🪓')
})

app.get('/user/:id', async(req,res) => {
    const { id } = req.params

    const user = await User.findById(id, '-pass')
    
    if(!user) {
        return res.status(422).json({ msg: 'Usuário não encontrado!' })
    }

    res.status(200).json(user)
})

function checkToken(req,res,next) {
    const header = req.headers['authorization']

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ')
        const token = bearer[1]

        req.token = token
        next()
    } else {
        res.sendStatus(403)
    }
}

app.post('/auth/register', async(req,res) => {
    const { user, email, pass, confirmPass } = req.body

    if(!user || !email || !pass || !confirmPass) {
        return res.status(422).json({ msg: 'Preencha todos os campos!' })
    }

    if(pass !== confirmPass) {
        return res.status(422).json({ msg: 'As senhas não conferem!' })
    }

    const userExists = await User.findOne({email:email})

    if(userExists) {
        return res.status(422).json({ msg: 'Usuário já existe!' })
    }

    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(pass, salt)

    const newUser = new User({
        user,
        email,
        pass: hash,
    })

    try {
        await newUser.save()
        res.status(201).json({ msg: 'Usuário criado com sucesso!' })
    } catch (error) {
        console.log(error)
    }
})

app.post('/auth/login', async(req,res) => {
    const {email, pass} = req.body

    if(!email || !pass) {
        return res.status(422).json({ msg: 'Preencha todos os campos!' })
    }

    const user = await User.findOne({email:email})

    if(!user) {
        return res.status(422).json({ msg: 'Usuário não encontrado!' })
    }

    const checkPass = await bcrypt.compare(pass, user.pass)

    if(!checkPass) {
        return res.status(422).json({ msg: 'Senha incorreta!' })
    }

    const secret = process.env.JWT_SECRET
    const token = jwt.sign({id:user._id}, secret, {expiresIn: '2h'})

    try {
        res.status(200).json({ msg: 'Login realizado com sucesso!', token })
    } catch (error) {
        console.log(error)
    }
})
