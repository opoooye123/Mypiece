const axios = require("axios");

const initializePayment = async(
    req,
    res
) => {
    try{
        const{
            email,
            amount,
        } = req.body;

        const response = 
        await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email,
                amount: amount * 100,
            },
            {
                headers: {
                    Authorization:
                    `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type":
                    "application/json",
                },
            }
        );

        res.json(
            response.data.data
        );

    }catch(error){
        console.log(error.response?.data);

        res.status(500).json({
            message:
            "Payment initialization failed",
        });
    }
};

const verifyPayment = async (
    req,
    res
) => {
    try {
        const response = 
        await axios.get(
            `https://api.paystack.co/transaction/verify/${req.params.reference}`,
            {
                headers: {
                    Authorization:
                      `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        res.json(
            response.data.data
        );
    } catch (error) {
        console.log(error.response?.data);

        res.status(500).json({
            message:
              "Payment verification failed",
        });
    }
}

module.exports = {
    initializePayment,
    verifyPayment
}