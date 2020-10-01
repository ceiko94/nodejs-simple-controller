const express = require('express');
const path = require('path');
const bookRouter = express.Router();
var db = require("../database/databaseConnection");

const books = [

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

bookRouter.route('/').get((req, res) => {
    getAllBooks().then((result) => {
        res.render(
            'index',
            {
                title: 'Mon premier projet NodeJS',
                schoolSubject: 'Pipeline de traitements de données pour le Cloud',
                books: result
            });
    }).catch((error) => {

    });
});

bookRouter.route('/feed').get((req, res) => {
    for (book of books) {
        let modelBook = new Book();
        modelBook = Object.assign(modelBook, book);
        modelBook.save();
    }
    res.json({ result: 'Books inserted !' });
});

bookRouter.route('/create-all').post((req, res) => {
    insertAllBooks().then(result => res.redirect('/')).catch(result => res.redirect('/'));
});


function getAllBooks() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM BOOK", (err, result) => {
            const booksFromQuery = [];
            if (err) {
                reject(err);
            } else {
                if (result) {
                    for (let book of result) {
                        let newBook = { title: book.TITLE, genre: book.GENRE, author: book.AUTHOR };
                        booksFromQuery.push(newBook);
                    }
                }
            }
            resolve(booksFromQuery);
        });
    });
}

function insertAllBooks() {
    return new Promise((resolve, reject) => {
        const booksToInsert = [];
        for (let b of books) {
            booksToInsert.push([b.title, b.genre, b.author]);
        }
        db.query('INSERT INTO BOOK(TITLE, GENRE, AUTHOR) VALUES ?', [booksToInsert], (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(result);
        });
    });
}


module.exports = bookRouter;