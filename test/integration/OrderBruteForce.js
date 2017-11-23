/* eslint-env mocha */
import { expect } from 'chai';

// Mark tests as a dependency, so that they execute first
import './OrderBase';

import OrderBruteForce from '../../app/server/ordering/OrderBruteForce';
import Restaurant from '../../app/server/Restaurant';

describe('Brute Force', () => {
  it('should instantiate with a list of restaurants', () => {
    const r1 = new Restaurant('Test 1', 3, { veggie: 1, gluten: 1 });
    const r2 = new Restaurant('Test 2', 1);
    const order = new OrderBruteForce(2, { veggie: 1, gluten: 1 });
    expect(() => order.calculateOrders(r1, r2)).to.not.throw();
  });
});
