const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method Not Allowed" });
        return;
    }

    const { amount, projectId } = req.body;

    if (!amount || !projectId) {
        res.status(400).json({ error: "Missing amount or projectId" });
        return;
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `Donation for Project ${projectId}`,
                        },
                        unit_amount: amount * 100, // Stripe expects amount in paise
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.VITE_FRONTEND_URL}/success`,
            cancel_url: `${process.env.VITE_FRONTEND_URL}/cancel`,
            metadata: {
                projectId,
            },
        });

        res.status(200).json({ sessionId: session.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
