const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect('mongodb+srv://clusterdb:Mmm7jhZHPjIxabgH@cluster0.nis6k.mongodb.net/?retryWrites=true&w=majority').then((req)=>{
    console.log('connected to DB')
}).catch((error)=>{
    console.log('error',error)
});

// Create Order schema
const OrderSchema = new mongoose.Schema({
    order_id: { type: String, unique: true, required: true },
    item_name: { type: String, required: true },
    cost: { type: Number, required: true },
    order_date: { type: Date, default: Date.now },
    delivery_date: { type: Date, required: true },
});

module.exports.Order = mongoose.model('Order', OrderSchema);