/* eslint-env mocha */
import { expect } from 'chai';

import MealBase from '../../../../app/server/MealBase';

describe('MealBase', () => {
  it('should instantiate with no specialized meals', () => {
    const base = new MealBase(50);
    expect(base.getRemainingMeals()).to.equal(50);
    expect(base.getRemainingVeggie()).to.equal(0);
    expect(base.getRemainingGluten()).to.equal(0);
  });

  it('should instantiate with specialized meals', () => {
    const base = new MealBase(50, { veggie: 5, gluten: 7 });
    expect(base.getRemainingMeals()).to.equal(50);
    expect(base.getRemainingVeggie()).to.equal(5);
    expect(base.getRemainingGluten()).to.equal(7);
  });

  it('should throw an exception if instantiated with negative meals', () => {
    expect(() => new MealBase(-1)).to.throw('with negative meals');
    expect(() => new MealBase(50, { veggie: -1 })).to.throw('with negative meals');
    expect(() => new MealBase(50, { gluten: -1 })).to.throw('with negative meals');
  });

  it('should throw an exception if a specialized meal exceed total meals', () => {
    // The sum of specialized may exceed the total, since either of them can be
    // fully ordered, but a single specialized meal cannot exceed the total.
    expect(() => new MealBase(1, { veggie: 2 })).to.throw('exceed total meals');
    expect(() => new MealBase(1, { gluten: 2 })).to.throw('exceed total meals');
    expect(() => new MealBase(2, { veggie: 2, gluten: 2 })).to.not.throw();
  });

  it('should only allow ordering specific meals', () => {
    const base = new MealBase(50);
    expect(() => base.orderMeal()).to.not.throw();
    expect(() => base.orderMeal('veggie')).to.not.throw();
    expect(() => base.orderMeal('gluten')).to.not.throw();
    expect(() => base.orderMeal('random')).to.throw('Cannot order unsupported');
  });

  it('should not allow ordering specialized meals when none are available', () => {
    const base = new MealBase(50);
    expect(base.orderMeal('veggie')).to.equal(false);
    expect(base.orderMeal('gluten')).to.equal(false);
    expect(base.getRemainingMeals()).to.equal(50);
  });

  it('should update when a meal is ordered', () => {
    const base = new MealBase(50, { veggie: 5, gluten: 7 });
    base.orderMeal();
    expect(base.getRemainingMeals()).to.equal(49);
    expect(base.getRemainingVeggie()).to.equal(5);
    expect(base.getRemainingGluten()).to.equal(7);
  });

  it('should update when a veggie meal is ordered', () => {
    const base = new MealBase(50, { veggie: 5, gluten: 7 });
    base.orderMeal('veggie');
    expect(base.getRemainingMeals()).to.equal(49);
    expect(base.getRemainingVeggie()).to.equal(4);
    expect(base.getRemainingGluten()).to.equal(7);
  });

  it('should update when a gluten meal is ordered', () => {
    const base = new MealBase(50, { veggie: 5, gluten: 7 });
    base.orderMeal('gluten');
    expect(base.getRemainingMeals()).to.equal(49);
    expect(base.getRemainingVeggie()).to.equal(5);
    expect(base.getRemainingGluten()).to.equal(6);
  });
});
