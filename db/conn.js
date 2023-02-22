const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yxbivzk.mongodb.net/?retryWrites=true&w=majority`);
        
        console.log('Conectado ao banco de dados!')

    } catch {
        console.log(`Erro!`)
    }
}

module.exports = main;