import MealBase from './MealBase';

export default class Restaurant extends MealBase {
  constructor(name, rating, meals, specialized) {
    super(meals, specialized);
    this._name = name;
    this._rating = rating;
  }

  getName() { return this._name; }
  getRating() { return this._rating; }
  getRemainingOther() { return this._meals; }
}
