import OrderModel from '../models/Order.js'

const OrderController = {
    create(req,res) {
        OrderModel.create(req.body)

        .then(order => res.status(200).send(order)

        )
        .catch(error => {
            console.log(error)
            res.status(500).send({ message : 'Error creando el pedido'})
        });
    },
    getAllOrders(req,res) {
        OrderModel.find()
        .then(order => res.status(200).send(order))
        
        .catch(error => {
            console.log(error);
            res.status(500).send({ message : 'Error obteniendo el pedido'})
        })
    },
    getOneOrder(req,res) {
        const { id } = req.params
        OrderModel.findById(id)

        .then(order => res.status(200).send(order))

        .catch(error => {
            console.log(error)
            res.status(500).send({ message : 'Error obteniendo el pedido'})
        })
    },
    update(req,res) {
        const { id } = req.params
        OrderModel.findByIdAndUpdate( id,req.body, {
            new:true
        })

        .then(order => res.send(order))

        .catch( error => {
            console.log(error)
            res.status(500).send({message : 'Error actualizando el pedido'})
        })
    },

    delete(req,res) {
        const { id } = req.params
        OrderModel.findOneAndDelete(id)

        .then(order => res.status(200).send({message : 'Pedido eliminado con exito'}))

        .catch(error => {
            console.log(error)
            res.status(500).send({message : 'Error eliminando el pedido'})
        })
    }
}

export default OrderController;