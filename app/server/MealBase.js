export const capFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

export const allowedMeals = ['veggie', 'gluten', 'other'];

export default class MealBase {
  constructor(meals, { veggie = 0, gluten = 0 } = {}) {
    if (meals < 0 || veggie < 0 || gluten < 0) {
      throw new Error(`Cannot instantiate ${this.constructor.name} with negative meals`);
    }
    if (veggie > meals) { throw new Error('Veggie meals cannot exceed total meals'); }
    if (gluten > meals) { throw new Error('Gluten meals cannot exceed total meals'); }

    this._initialValues = { meals, veggie, gluten };
    this.reset();
  }

  reset() {
    this._meals = this._initialValues.meals;
    this._veggie = this._initialValues.veggie;
    this._gluten = this._initialValues.gluten;
    this._orders = { other: 0, veggie: 0, gluten: 0 };
  }

  getRemainingMeals() { return this._meals; }
  getRemainingVeggie() { return Math.min(this._meals, this._veggie); }
  getRemainingGluten() { return Math.min(this._meals, this._gluten); }
  // Instead of using Immutable.js for a single piece of logic, I feel it is
  // cleaner to just spread the object to prevent mutation in this instance.
  getOrders() { return { ...this._orders }; }

  orderMeal(specialized = 'other') {
    if (allowedMeals.includes(specialized) === false) {
      throw new Error(`Cannot order unsupported "${specialized}" meal`);
    }
    if (this.getRemainingMeals() <= 0) { return false; }
    if (specialized !== 'other' && this[`getRemaining${capFirstLetter(specialized)}`]() <= 0) {
      return false;
    }

    this._meals -= 1;
    if (specialized !== 'other') { this[`_${specialized}`] -= 1; }
    this._orders[specialized] += 1;

    return true;
  }
}
