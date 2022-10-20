const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const bodyParser = require('body-parser');

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
    res.status(500).json({ error: error.message });
  }
});


// Match the raw body to content type application/json
router.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  const event = request.body;

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({received: true});
});



module.exports = router;
