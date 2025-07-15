const User = require('../models/User');
const Order = require('../models/Order');

exports.getAllCustomer = async (req, res) => {
    try {
        // Find all users with their basic info
        const customers = await User.find({})
            .select('-password -otp -otpExpires -__v')
            .lean();

        if (!customers || customers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No customers found',
                data: []
            });
        }

        // Process all customers to format as per the UI requirements
        const formattedCustomers = await Promise.all(customers.map(async (customer) => {
            // Get the phone number from the default address
            const phone = customer.addresses?.find(addr => addr.isDefault)?.phone || 
                         (customer.addresses?.[0]?.phone || 'Not provided');

            // Count completed orders and calculate total spent
            let orderCount = 0;
            let totalSpent = 0;
            let orders = [];

            if (customer.orders && customer.orders.length > 0) {
                // Find all completed orders for this customer
                const customerOrders = await Order.find({
                    orderId: { $in: customer.orders },
                    paymentStatus: 'completed'
                }).lean();

                orderCount = customerOrders.length;
                totalSpent = customerOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
                
                // Prepare order details if needed
                orders = customerOrders.map(order => ({
                    id: order._id,
                    orderId: order.orderId,
                    date: order.createdAt?.toISOString().split('T')[0] || 'Unknown',
                    amount: order.totalAmount,
                    status: order.orderStatus
                }));
            }

            return {
                customerId: `CUST${customer._id.toString().substr(-3).toUpperCase()}`, // Format: CUSTXXX
                customerName: `${customer.firstName} ${customer.lastName}`,
                email: customer.email,
                contact: phone,
                orders: orderCount, // Just the count as shown in UI
                totalSpent: totalSpent.toLocaleString('en-IN'), // Format with commas
                status: 'Active', // Default status
                joinDate: customer.createdAt?.toISOString().split('T')[0] || 'Unknown',
                // Additional fields that might be needed for actions
                _id: customer._id,
                orderDetails: orders // Optional: include full order details if needed
            };
        }));

        res.status(200).json({
            success: true,
            message: 'Customers retrieved successfully',
            data: formattedCustomers
        });

    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};