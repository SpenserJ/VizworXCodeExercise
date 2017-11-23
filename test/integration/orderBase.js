/* eslint-env mocha */
import { expect } from 'chai';

// Mark tests as a dependency, so that they execute first
import '../unit/app/server/MealBase';
import '../unit/app/server/Restaurant';

import OrderBase from '../../app/server/ordering/OrderBase';
import Restaurant from '../../app/server/Restaurant';

describe('Order Base', () => {
  it('should properly calculate remaining meals', () => {
    const order = new OrderBase(1, { veggie: 1, gluten: 1 });
    expect(order.getRemainingMeals()).to.equal(3);
    expect(order.getRemainingOther()).to.equal(1);
    expect(order.getRemainingVeggie()).to.equal(1);
    expect(order.getRemainingGluten()).to.equal(1);
  });

  it('should only allow ordering specific meals', () => {
    const order = new OrderBase(50);
    const restaurant = new Restaurant('Test', 50, { veggie: 1, gluten: 1 });
    expect(() => order.orderMeal(restaurant)).to.not.throw();
    expect(() => order.orderMeal(restaurant, 'veggie')).to.not.throw();
    expect(() => order.orderMeal(restaurant, 'gluten')).to.not.throw();
    expect(() => order.orderMeal(restaurant, 'random')).to.throw('Cannot order unsupported');
  });

  it('should not order a meal if the restaurant is out of stock', () => {
    const order = new OrderBase(50);
    const restaurant = new Restaurant('Test', 0);
    expect(order.orderMeal(restaurant)).to.equal(false);
    expect(order.orderMeal(restaurant, 'veggie')).to.equal(false);
    expect(order.orderMeal(restaurant, 'gluten')).to.equal(false);
  });

  it('should not order a meal if it isn\'t required', () => {
    const order = new OrderBase(0);
    const restaurant = new Restaurant('Test', 50);
    expect(order.orderMeal(restaurant)).to.equal(false);
    expect(order.orderMeal(restaurant, 'veggie')).to.equal(false);
    expect(order.orderMeal(restaurant, 'gluten')).to.equal(false);
  });

  it('should update the number of remaining meals when an order succeeds', () => {
    const order = new OrderBase(1, { veggie: 1, gluten: 1 });
    const restaurant = new Restaurant('Test', 3, { veggie: 1, gluten: 1 });
    expect(order.getRemainingMeals()).to.equal(3);
    expect(order.orderMeal(restaurant)).to.equal(true);
    expect(order.getRemainingOther()).to.equal(0);
    expect(order.getRemainingMeals()).to.equal(2);
    expect(order.orderMeal(restaurant, 'veggie')).to.equal(true);
    expect(order.getRemainingVeggie()).to.equal(0);
    expect(order.getRemainingMeals()).to.equal(1);
    expect(order.orderMeal(restaurant, 'gluten')).to.equal(true);
    expect(order.getRemainingGluten()).to.equal(0);
    expect(order.getRemainingMeals()).to.equal(0);
  });
});
