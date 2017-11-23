import Restaurant from './Restaurant';
import OrderBruteForce from './ordering/OrderBruteForce';

/**
 * Edit the input variable to modify a company's needs
 */

const input = {
  requirements: {
    total: 50,
    specialization: {
      veggie: 5,
      gluten: 7,
    },
  },
  restaurants: {
    'Restaurant A': {
      total: 40,
      specialization: { veggie: 4 },
      rating: 5,
    },
    'Restaurant B': {
      total: 100,
      specialization: { veggie: 20, gluten: 20 },
      rating: 3,
    },
  },
};

/**
 * Everything below here is for setting up class instances and calculating output
 */

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
console.log(result);
