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
    expect(() => new MealBase(-1)).to.throw();
    expect(() => new MealBase(50, { veggie: -1 })).to.throw();
    expect(() => new MealBase(50, { gluten: -1 })).to.throw();
  });
});
