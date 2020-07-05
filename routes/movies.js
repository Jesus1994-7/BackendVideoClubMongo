import express from 'express'
import MovieController from '../controllers/MovieController.js'
const router = express.Router();
import { auth } from '../middleware/auth.js'


router.get('/', MovieController.getAll);
router.get('/page/:page', MovieController.getPageBy);
router.get('/mostpopular', MovieController.mostPopular);
router.get('/lastmovies', MovieController.lastMovies);
router.get('/search/:title', MovieController.getByTitle);
router.get('/genre/:showGenre', MovieController.showMoviesGenre);
router.post('/', auth, MovieController.create);//isAdmin
router.put('/:id', auth, MovieController.update);//isAdmin
router.delete('/:id', auth, MovieController.delete); //isAdmin

export default router;