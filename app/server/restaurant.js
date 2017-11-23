import MealBase from './MealBase';

export default class Restaurant extends MealBase {
  constructor(name, meals, specialized) {
    super(meals, specialized);
    this._name = name;
  }

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
