import MovieModel from '../models/Movie.js'

const MovieController = {
    getAll(req,res) {
        MovieModel.find()
            .then(movies => res.send(movies))
            .catch(error => {
                console.log(error)
                res.status(500).send({ message : 'Problema intentando conseguir las peliculas'})
            })
    },
    //Obtenerlas por paginas
    getPageBy(req,res) {
        const { page } = req.params
        const skip = (page -1) * 20
        MovieModel.find()
            .skip(skip).limit(20)
            .then( movies => res.send(movies))
            .catch( error => {
                console.log(error)
                res.status(500).send({ message : 'Problema intentando conseguir las paginas'})
            })
    },
    //Las mas populares
    mostPopular (req,res){
        MovieModel.find({
            popularity : {
                $gte : 60
            }
        })
        .then(movies => res.send(movies))
        .catch(error => {
            console.error(error)
            res.status(500).send({message : 'Error obteniendo las mas populares'})
        })
    },
    //Ultimas peliculas
    lastMovies (req,res) {
        MovieModel.find({
            release_date : {
                "$gte" : new Date(2020, 1, 1), "$lt": new Date()
            }
        })
        .then(movies => res.send(movies))
        .catch(error => {
            console.error(error)
            res.status(500).send({message : 'Error obteniendo las ultimas peliculas'})
        })
    },
    getByTitle(req,res) {
        const title = req.params.title;
        const titleRegExp = new RegExp(title, 'i');
        MovieModel.find({ title: titleRegExp})
        .limit(30)
        .then(movies => res.send(movies))
        .catch(error => {
            console.error(error)
            res.status(500).send({message : 'Error obteniendo por titulo'})
        })
    },

    //Peliculas por genero
    showMoviesGenre (req, res) {
        let allgenres = {
            "action": 28,
            "adventure" : 12,
            "animation": 16,
            "comedy": 35,
            "crime": 80,
            "documentary": 99,
            "drama": 18,
            "family": 10751,
            "fantasy": 14,
            "history": 36,
            "horror": 27,
            "music": 10402,
            "mystery": 9648,
            "romance": 10749,
            "science fiction": 878,
            "tv movie": 10770,
            "thriller": 53,
            "war": 10752,
            "western" : 37
        }

        let refGen = req.params.showGenre.toLowerCase();

        MovieModel.find({
            
            $and : [{
                genre_ids: allgenres[refGen]
            },{
                poster_path: { $ne: null}
            }]
        }).limit(75).sort({ release_date : -1})

            .then(movies => {
                res.send(movies)
            })
            .catch(error => console.log(error))
    },

    //Permisos ADMIN
    //Crear una pelicula
    create (req,res) {
        MovieModel.create(req.body)
            .then( movie => res.status(200).send(movie))
            .catch( error => {
                console.log(error)
                res.status(500).send({ message : 'Problema creando pelicula'})
            })
    },
    //Actualizar una pelicula
    update (req,res) {
        const { id } = req.params;
        MovieModel.findByIdAndUpdate(id, req.body, {
            new : true
        })
            .then( movie => res.send(movie))
            .catch( error => {
                console.log(error)
                res.status(500).send({message : 'Error actualizando la pelicula'})
        })
    },
    //Eliminar una pelicula
    delete (req,res) {
        const { id } = req.params
        MovieModel.findByIdAndDelete(id)
            .then( movie => res.send({ message: 'Pelicula eliminada'}))
            .catch( error => {
                console.log(error)
                res.status(500).send({ message : 'Error elimando la pelicula'})
        })
    }
}

export default MovieController;

