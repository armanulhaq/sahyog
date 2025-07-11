import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); //initializes the Stripe client with the secret key

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).send({ message: "Only POST requests allowed" });
    }

    const { amount, project } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `Donation for ${project.funding_purpose} in ${project.area}`,
                            images: project.image_url
                                ? [project.image_url]
                                : [],
                        },
                        unit_amount: amount * 100, //amount expected in paise
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
