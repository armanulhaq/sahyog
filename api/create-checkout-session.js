import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).send({ message: "Only POST requests allowed" });
    }

    const { amount } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "Donation to Project",
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "https://donate-with-sahyog.vercel.app/success",
            cancel_url: "https://donate-with-sahyog.vercel.app/cancel",
        });

        res.status(200).json({ id: session.id });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
}
