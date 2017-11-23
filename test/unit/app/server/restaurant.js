/* eslint-env mocha */
import { expect } from 'chai';

// Mark tests as a dependency, so that they execute first
import './MealBase';

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
});
