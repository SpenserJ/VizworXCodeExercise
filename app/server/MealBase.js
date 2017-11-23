function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

  orderMeal(specialized = false) {
    if (this.getRemainingMeals() <= 0) { return false; }
    if (specialized !== false && this[`getRemaining${capFirstLetter(specialized)}`]() <= 0) {
      return false;
    }
    this._meals -= 1;
    if (specialized === 'veggie') {
      this._veggie -= 1;
    } else if (specialized === 'gluten') {
      this._gluten -= 1;
    }
    return true;
  }
}
