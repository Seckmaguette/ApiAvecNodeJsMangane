const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()

const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => res.send("Hello World"))

app.get('/api/users', (req, res) => {
    fs.readFile('./db.json', 'utf-8', (error, data) => {
        if (error) {
            console.log(error)
        } else {
            const users = JSON.parse(data)
            res.json(users)
        }
    })
})

app.post('/api/users', (req, res) => {
    fs.readFile('./db.json', 'utf-8', (error, data) => {
        if (error) {
            console.log(error)
        } else {
            const users = JSON.parse(data)
            let person = {
                prenom: req.body.prenom,
                nom: req.body.nom
            }
            users.push(person)
          fs.writeFile('./db.json', JSON.stringify(users, null, 2), (error) =>{
                if (error) {
                    console.log(error);
                } else {
                    res.json({message: "Utilisateur ajouté avec succès"})
                }
            })
        }
    })
})

app.listen(port, () => console.log("le server démarre sur le port : " + port))