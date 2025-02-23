const stripe = require("stripe");

const createPayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntent.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("Error creating a payment intent ", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPayment };
