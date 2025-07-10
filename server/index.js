const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
require("dotenv").config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
    const { amount } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "Donation for Project",
                        },
                        unit_amount: amount * 100, // in paise
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/success", // change if needed
            cancel_url: "http://localhost:5173/cancel",
        });

        res.json({ id: session.id });
    } catch (err) {
        console.error("Error creating Stripe session", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(4242, () => console.log("Server running on http://localhost:4242"));
