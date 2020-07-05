import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const OrderSchema = new mongoose.Schema({
    userId: ObjectId,
    moviesId: [ObjectId],
    deliveryDate: Date,
    returnDate: Date
}, {timestamps : true})

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;