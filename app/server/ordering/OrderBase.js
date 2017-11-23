import MealBase from '../MealBase';

export default class OrderBase extends MealBase {
  constructor(otherMeals, { veggie = 0, gluten = 0 } = {}) {
    // MealBase uses total meals, while orders uses non-specialized meals.
    super(otherMeals + veggie + gluten, { veggie, gluten });
  }

  getRemainingOther() { return this._meals - this._veggie - this._gluten; }

  orderMeal(restaurant, specialized = false) {
    let remaining = 0;
    switch (specialized) {
      case false: remaining = this.getRemainingOther(); break;
      case 'veggie': remaining = this.getRemainingVeggie(); break;
      case 'gluten': remaining = this.getRemainingGluten(); break;
      default: break;
    }

    if (remaining <= 0) { return false; }
    if (restaurant.orderMeal(specialized) === false) { return false; }
    super.orderMeal(specialized);
    return true;
  }
}
