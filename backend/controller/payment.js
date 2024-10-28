// Improved 10/22/2024
const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Payment processing route
router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount } = req.body;

      // Ensure that amount is passed correctly and it's in the smallest currency unit (e.g., paise for INR)
      if (!amount || isNaN(amount)) {
        return res.status(400).json({
          success: false,
          message: "Invalid amount. Ensure the amount is provided in the smallest unit of currency.",
        });
      }

      // Create a payment intent with Stripe
      const myPayment = await stripe.paymentIntents.create({
        amount: amount, // Amount should be in smallest unit (cents/paisa)
        currency: "usd", // Ensure the currency matches the front-end
        metadata: {
          company: "G-Market", // You can add any additional metadata here
        },
      });

      // Send back the client_secret for the payment intent to the client
      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });

    } catch (error) {
      console.error("Stripe Payment Error: ", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during payment processing.",
        error: error.message, // Send error details for easier debugging
      });
    }
  })
);

// Stripe API key route
router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

module.exports = router;
