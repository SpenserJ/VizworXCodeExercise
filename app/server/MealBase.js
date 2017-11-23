export const capFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

export const allowedMeals = ['veggie', 'gluten', 'other'];

export default class MealBase {
  constructor(meals, { veggie = 0, gluten = 0 } = {}) {
    if (meals < 0 || veggie < 0 || gluten < 0) {
      throw new Error(`Cannot instantiate ${this.constructor.name} with negative meals`);
    }
    this._meals = meals;
    this._veggie = veggie;
    this._gluten = gluten;
  }

  getRemainingMeals() { return this._meals; }
  getRemainingVeggie() { return Math.min(this._meals, this._veggie); }
  getRemainingGluten() { return Math.min(this._meals, this._gluten); }

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
    return true;
  }
}
