import mysql from 'mysql2/promise.js';
import './config/mongoose.js';
import MovieModel from './models/Movie.js';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'videoclubreal'
});
const [movies, fields] = await connection.execute('SELECT * FROM movies');
await MovieModel.insertMany(movies);
console.log('Base de datos sedeada');
