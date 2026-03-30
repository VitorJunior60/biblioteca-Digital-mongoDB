require('dotenv').config();

const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const client = new MongoClient(url);

async function connectDB() {
    try {
        await client.connect();
        console.log("Você está conectado ao MongoDB");

        const db = client.db("Biblioteca");
        const collection = db.collection("Livros");

        const resultado = await collection.insertMany([
            {
                titulo: "O Senhor dos Anéis",
                autor: "J.R.R. Tolkien",
                ano: 1954,
                capas: [
                    "capaOSenhorDosAnéis1.jpg",
                    "capaOSenhorDosAnéis2.jpg"
                ],
                videos: [
                    {
                        estilo: "Entrevista do Autor",
                        url: "https://www.youtube.com/watch?v=1JF_COdf5Zg",
                    },
                    {
                        estilo: "Análise do Livro",
                        url: "https://www.youtube.com/watch?v=AYh-J0AYOk8",
                    }
                ]
            },
            {
                titulo: "The choice",
                autor: "Nicholas Sparks",
                ano: 2007,
                capas: [
                    "capaTheChoice1.jpg",
                    "capaTheChoice2.jpg"
                ],
                videos: [
                    {
                        estilo: "Entrevista do Autor",
                        url: "https://www.youtube.com/watch?v=S1IFyaXs3I4",
                    },
                    {
                        estilo: "Análise do Livro",
                        url: "https://www.youtube.com/watch?v=S1IFyaXs3I4",
                    }
                ]
            },
            {
                titulo: "É assim que acaba",
                autor: "Colleen Hoover",
                ano: 2018,
                capas: [
                    "capaÉAssimQueAcaba1.jpg",
                    "capaÉAssimQueAcaba2.jpg"
                ],
                videos: [
                    {
                        estilo: "Entrevista do Autor",
                        url: "https://www.youtube.com/watch?v=zdERAQ6CIJM",
                    },
                    {
                        estilo: "Análise do Livro",
                        url: "https://www.youtube.com/watch?v=FA1Weg9ZZVQ",
                    }
                ]
            }
        ]);

        console.log(`Livros inseridos com sucesso: ${resultado.insertedCount}`);

        const dados = await collection.find({}).toArray();
        console.log(`Total de livros no banco: ${dados.length}`);
        console.log(JSON.stringify(dados, null, 2));

    } catch (erro) {
        console.error("Erro ao conectar ao MongoDB:", erro.message);
    } finally {
        await client.close();
        console.log("Conexão fechada");
    }
}

connectDB();