import MealBase, { capFirstLetter, allowedMeals } from '../MealBase';

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
}
