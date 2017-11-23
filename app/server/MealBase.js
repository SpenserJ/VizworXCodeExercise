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
  getRemainingVeggie() { return this._veggie; }
  getRemainingGluten() { return this._gluten; }
}
