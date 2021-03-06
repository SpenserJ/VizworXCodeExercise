import MealBase, { capFirstLetter, allowedMeals } from '../MealBase';
import Restaurant from '../Restaurant';

export default class OrderBase extends MealBase {
  constructor(otherMeals, { veggie = 0, gluten = 0 } = {}) {
    // MealBase uses total meals, while orders uses non-specialized meals.
    super(otherMeals + veggie + gluten, { veggie, gluten });
  }

  getRemainingOther() {
    return this.getRemainingMeals() - this.getRemainingVeggie() - this.getRemainingGluten();
  }

  orderMeal(restaurant, specialized = 'other') {
    if (allowedMeals.includes(specialized) === false) {
      throw new Error(`Cannot order unsupported "${specialized}" meal`);
    }
    const remaining = this[`getRemaining${capFirstLetter(specialized)}`]();
    if (remaining <= 0) { return false; }
    if (restaurant.orderMeal(specialized) === false) { return false; }
    super.orderMeal(specialized);
    return true;
  }

  calculateOrders(...restaurantsRaw) {
    // Flatten the restaurants, just in case someone passes an array in
    const restaurants = restaurantsRaw.reduce((acc, next) => acc.concat(next), []);
    // Ensure at least two arguments are provided
    if (restaurants.length < 2) {
      throw new TypeError('Not enough restaurants provided');
    }
    // Ensure all arguments are Restaurants
    if (restaurants.every(v => v instanceof Restaurant) !== true) {
      throw new TypeError('Invalid restaurants provided');
    }
    // If this isn't being called via a class extension, throw an exception
    if (this.calculateOrders === OrderBase.prototype.calculateOrders) {
      throw new Error(`"calculateOrders" is not implemented in ${this.constructor.name}`);
    }

    // Return the flattened restaurants after sorting by rating;
    return restaurants.sort((a, b) => b.getRating() - a.getRating());
  }

  formatOrder = (restaurants) => {
    const { order, ratingData } = restaurants.reduce((acc, next) => {
      const rawOrder = next.getOrders();
      const orderCount = (rawOrder.other + rawOrder.veggie + rawOrder.gluten);
      return {
        order: {
          ...acc.order,
          [next.getName()]: rawOrder,
        },
        ratingData: {
          count: acc.ratingData.count + orderCount,
          totalRating: acc.ratingData.totalRating + (orderCount * next.getRating()),
        },
      };
    }, { order: {}, ratingData: { count: 0, totalRating: 0 } });
    return {
      order,
      rating: Math.round((ratingData.totalRating * 10) / ratingData.count) / 10,
    };
  }
}
