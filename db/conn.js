require('dotenv').config();
const mongoose = require('mongoose');

async function main() {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect('mongodb+srv://aereon01:qxicC8XnajEQ1Wvh@cluster0.yxbivzk.mongodb.net/?retryWrites=true&w=majority');
        
        console.log('Conectado ao banco de dados!')

    } catch {
        console.log(`Erro!`)
    }
}

module.exports = main;