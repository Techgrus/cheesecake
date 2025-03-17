import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const makePayment = async (order_id, user_id, order) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: order.orderItems.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.product,
          },
          unit_amount: product.price * 100, //convert to cents
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.BASE_URL}/api/stripe/success/${user_id}/${order_id}`,
      cancel_url: `${process.env.BASE_URL}/api/stripe/cancel/${order_id}`,
    });

    return session.url;
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
