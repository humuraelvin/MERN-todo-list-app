const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/todo')

const app = express();
app.use(cors());
app.use(express.json());

//mongodb conn

const dbCon = async () => {
    try {
        await mongoose.connect("mongodb+srv://elvinhumura:ozFRLj65PJ6dmwzo@cluster0.huok3f1.mongodb.net/ToDos?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connected to MongoDb Sucessfully");
    } catch (error) {
        console.log(error);
    }
}

dbCon();


app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then((result) => res.json(result))
        .catch((err) => res.json(err))
})

app.get('/get', (req, res) => {
    TodoModel.find()
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})


const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})