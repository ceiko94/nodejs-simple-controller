const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Book = require('./models/bookModel');
const booksRouter = express.Router();

const PORT = 80;
let DATABASE_IP = process.env.DATABASE_IP || 'localhost';
const db = mongoose.connect(`mongodb://${DATABASE_IP}/bookAPI`);


booksRouter.route('/').get((req, res) => {
    Book.find((err, books) => {
        if(err){
            return res.send(err);
        }
        return res.json(books);
    });
});

booksRouter.route('/feed').get((req, res) => {
    let books = [
        
        {
            title: 'Childhood',
            genre: 'Biography',
            author: 'Cheikna DANSOKO',
            read: false
        },
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'Les Misérables',
            genre: 'Historical Fiction',
            author: 'Victor Hugo',
            read: false
        },
        {
            title: 'The Time Machine',
            genre: 'Science Fiction',
            author: 'H. G. Wells',
            read: false
        },
        {
            title: 'A Journey into the Center of the Earth',
            genre: 'Science Fiction',
            author: 'Jules Verne',
            read: false
        },
        {
            title: 'The Dark World',
            genre: 'Fantasy',
            author: 'Henry Kuttner',
            read: false
        },
        {
            title: 'The Wind in the Willows',
            genre: 'Fantasy',
            author: 'Kenneth Grahame',
            read: false
        },
        {
            title: 'Life On The Mississippi',
            genre: 'History',
            author: 'Mark Twain',
            read: false
        }
    ];
    for(book of books){
        let modelBook = new Book();
        modelBook = Object.assign(modelBook, book);
        modelBook.save();
    }
    res.json({result : 'Books inserted !'});
});

app.use('/', booksRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Connection to database with IP : ${DATABASE_IP}`);
});