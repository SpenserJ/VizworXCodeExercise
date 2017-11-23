import MealBase from './MealBase';

export default class Restaurant extends MealBase {
  constructor(name, meals, specialized) {
    super(meals, specialized);
    this._name = name;
  }

  getRemainingOther() { return this._meals; }
}
