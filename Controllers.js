const { Order } = require("./db");

module.exports.create = async (req, res, next) => {

    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports.update = async (req, res, next) => {

    try {
        const { order_id, delivery_date } = req.body;
        const order = await Order.findOneAndUpdate({ order_id }, { delivery_date }, { new: true });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports.list = async (req, res, next) => {
    try {
        const { order_date } = req.query;
        const startDate = new Date(order_date);
        const endDate = new Date(order_date);
        endDate.setDate(endDate.getDate() + 1); // Add one day to get orders until midnight of the specified date

        const orders = await Order.find({
            order_date: {
                $gte: startDate,
                $lt: endDate
            }
        });

        res.json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.search = async (req, res, next) => {

    try {
        const { order_id } = req.body;
        const order = await Order.findOne({ order_id });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports.deleteController = async (req, res, next) => {

    try {
        const { order_id } = req.body;
        const order = await Order.findOneAndDelete({ order_id });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ message: 'Order deleted successfully ' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}