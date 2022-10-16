const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, {id: 1, priceInCents: 100, name: "Buy in-game $1000", description: '$1000' }],
  [2, {id: 2, priceInCents: 200, name: "Buy in-game $2000", description: '$2000' }],
  [3, {id: 3, priceInCents: 500, name: "Buy in-game $5000", description: '$5000' }],
  [4, {id: 4, priceInCents: 1000, name: "Buy in-game $10000", description: '$10000' }],
]);

router.get("/getShopItems", (req, res) => {
  res.send(Array.from(storeItems.values()));
});

router.post("/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.item.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/app/home`,
      cancel_url: `${process.env.CLIENT_URL}/app/home`,
    });
    res.send({ url: session.url });
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
