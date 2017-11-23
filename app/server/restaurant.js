import MealBase from './MealBase';

export default class Restaurant extends MealBase {
  constructor(name, meals, specialized) {
    super(meals, specialized);
    this._name = name;
  }

  getName() { return this._name; }
  getRemainingOther() { return this._meals; }
}
