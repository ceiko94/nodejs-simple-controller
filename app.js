const express = require('express');
const app = express();
const path = require('path');
const PORT = 80;

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/css')));

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use(express.urlencoded());
app.use(express.json());

const bookRouter = require('./src/routes/bookRoutes');
app.use('/', bookRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Connection to database with IP : ${DATABASE_IP}`);
});