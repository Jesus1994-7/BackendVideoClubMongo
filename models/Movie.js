import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    popularity: Number,
    poster_path: String,
    genre_ids: [Number],
    overview: String,
    release_date : Date
});

const MovieModel = mongoose.model('Movie', MovieSchema);
export default MovieModel;