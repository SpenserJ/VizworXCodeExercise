import OrderBase from './OrderBase';
import { capFirstLetter } from '../MealBase';

/**
 * OrderBruteForce will attempt to order veggie meals first, then gluten-free
 * meals, and finally non-specialized meals. If it is unable to complete the
 * order, it will reset and order gluten-free before veggie.
 */
export default class OrderBruteForce extends OrderBase {
  calculateOrders(...restaurantsRaw) {
    const restaurants = super.calculateOrders(restaurantsRaw);

    const loopRestaurants = (specializationOrder) => {
      specializationOrder.forEach((specialization) => {
        restaurants.forEach((restaurant) => {
          if (this[`getRemaining${capFirstLetter(specialization)}`]() === 0) {
            return;
          }
          this.orderMeal(restaurant, specialization);
        });
      });

      if (this.getRemainingMeals() > 0) { return false; }
      return true;
    };

    if (loopRestaurants(['veggie', 'gluten', 'other']) === false) {
      if (loopRestaurants(['gluten', 'veggie', 'other']) === false) {
        return false;
      }
    }

    return true;
  }
}
