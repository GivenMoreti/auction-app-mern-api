const stripe = require("stripe");

const createPayment = async (req, res) => {
  const { amount, currency, token } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntent.create({
      amount,
      currency,
      payment_method: token,
      confirm: true,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("Error creating a payment intent ", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPayment };
