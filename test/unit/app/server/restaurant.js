/* eslint-env mocha */
import { expect } from 'chai';


import Restaurant from '../../../../app/server/Restaurant';

describe('Restaurant', () => {
  it('should instantiate with no specialized meals', () => {
    const restaurant = new Restaurant('Test', 50);
    expect(restaurant.getRemainingMeals()).to.equal(50);
    expect(restaurant.getRemainingVeggie()).to.equal(0);
    expect(restaurant.getRemainingGluten()).to.equal(0);
  });

  it('should instantiate with specialized meals', () => {
    const restaurant = new Restaurant('Test', 50, { veggie: 5, gluten: 7 });
    expect(restaurant.getRemainingMeals()).to.equal(50);
    expect(restaurant.getRemainingVeggie()).to.equal(5);
    expect(restaurant.getRemainingGluten()).to.equal(7);
  });

  it('should update when a meal is ordered', () => {
    const restaurant = new Restaurant('Test', 50, { veggie: 5, gluten: 7 });
    restaurant.orderMeal();
    expect(restaurant.getRemainingMeals()).to.equal(49);
    expect(restaurant.getRemainingVeggie()).to.equal(5);
    expect(restaurant.getRemainingGluten()).to.equal(7);
  });

  it('should update when a veggie meal is ordered', () => {
    const restaurant = new Restaurant('Test', 50, { veggie: 5, gluten: 7 });
    restaurant.orderMeal('veggie');
    expect(restaurant.getRemainingMeals()).to.equal(49);
    expect(restaurant.getRemainingVeggie()).to.equal(4);
    expect(restaurant.getRemainingGluten()).to.equal(7);
  });

  it('should update when a gluten meal is ordered', () => {
    const restaurant = new Restaurant('Test', 50, { veggie: 5, gluten: 7 });
    restaurant.orderMeal('gluten');
    expect(restaurant.getRemainingMeals()).to.equal(49);
    expect(restaurant.getRemainingVeggie()).to.equal(5);
    expect(restaurant.getRemainingGluten()).to.equal(6);
  });
});
