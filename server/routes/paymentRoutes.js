const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const amountInCents = Math.round(amount * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/confirm-payment", async (req, res) => {
  try {
    const { paymentIntentId, orderDetails } = req.body;

    res.json({ success: true, message: "Payment confirmed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

