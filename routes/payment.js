require("dotenv").config();
const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "INR",
  };
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

router.get("/", (req, res) => {
  res.send("hello");
});

module.exports = router;
