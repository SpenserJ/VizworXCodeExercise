export default class Restaurant {
  constructor(name, meals, { veggie = 0, gluten = 0 } = {}) {
    if (meals < 0 || veggie < 0 || gluten < 0) {
      throw new Error('Cannot instantiate Restaurant with negative meals');
    }
    this._name = name;
    this._meals = meals;
    this._veggie = veggie;
    this._gluten = gluten;
  }

  getRemainingMeals() { return this._meals; }
  getRemainingVeggie() { return this._veggie; }
  getRemainingGluten() { return this._gluten; }

  orderMeal(specialized = false) {
    if (this._meals <= 0) { return false; }
    this._meals -= 1;
    if (specialized === 'veggie') {
      this._veggie -= 1;
    } else if (specialized === 'gluten') {
      this._gluten -= 1;
    }
    return true;
  }
}
