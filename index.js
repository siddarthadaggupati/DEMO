const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/BookModel.js');

const app = express();

app.use(cors());
app.use(express.json());


const url = "mongodb+srv://admin:admin@cluster0.rbtlcxt.mongodb.net/demo-testing?retryWrites=true&w=majority";

mongoose.connect(url)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));


app.post('/add-book', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(200).send("Inserted Successfully");
    } catch (err) {
        console.error(err);
        res.status(400).send("Internal Error");
    }
});

app.get('/get-book', async (req,res)=>{
    try{
        const result = await Book.findOne({isbn:req.body.isbn})
        res.status(200).send(result);
    }
    catch(err){
        res.status(400).send("Internal Error")
    }
})

app.get('/books', async (req,res)=>{
    try{
        const result = await Book.find()
        res.status(200).send(result);
    }
    catch(err){
        res.status(400).send("Internal Error")
    }
})

app.post('/update-book', async (req, res) => {
    try {
        const { isbn, ...updateData } = req.body;
        const updatedBook = await Book.findOneAndUpdate(
            { isbn },
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedBook) {
            return res.status(404).send("Book not found");
        }
        res.status(200).send("Updated Successfully");
    } catch (err) {
        console.error(err);
        res.status(400).send("Internal Error");
    }
});

app.delete('/delete-book', async (req, res) => {
    try {
        const result = await Book.deleteOne({ isbn: req.body.isbn });

        if (result.deletedCount > 0) {
            res.status(200).send("Deleted successfully");
        } else {
            res.status(404).send("No book found");
        }
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).send("Internal server error");
    }
});


app.get('/', (req, res) => {
    res.send("Welcome Siddartha to the backend");
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
