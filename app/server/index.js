import express from 'express';
import bodyParser from 'body-parser';

import Restaurant from './Restaurant';
import OrderBruteForce from './ordering/OrderBruteForce';

const app = express();
app.use(bodyParser.json());

app.post('/computeOrder', (req, res) => {
  try {
    const input = req.body;

    const restaurants = Object.entries(input.restaurants).map(([name, details]) => (
      new Restaurant(name, details.rating, details.total, details.specialization)
    ));

    const order = new OrderBruteForce(
      // Input is the total number of meals, but our order system calculates the number of other meals
      // Subtract all of the special meals from the total before instantiating the class
      input.requirements.total
        - Object.values(input.requirements.specialization).reduce((acc, v) => (acc + v), 0),
      input.requirements.specialization,
    );

    const result = order.calculateOrders(...restaurants);
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
    console.log(e);
  }
});

// eslint-disable-next-line no-console
app.listen(8081, () => console.log('Listening on 8081'));
