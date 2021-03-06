/* eslint-env mocha */
import { expect } from 'chai';

// Mark tests as a dependency, so that they execute first
import '../unit/app/server/ordering/OrderBase';

import OrderBruteForce from '../../app/server/ordering/OrderBruteForce';
import Restaurant from '../../app/server/Restaurant';

describe('Brute Force', () => {
  it('should instantiate with a list of restaurants', () => {
    const r1 = new Restaurant('Test 1', 3, 3, { veggie: 1, gluten: 1 });
    const r2 = new Restaurant('Test 2', 3, 1);
    const order = new OrderBruteForce(2, { veggie: 1, gluten: 1 });
    expect(() => order.calculateOrders(r1, r2)).to.not.throw();
  });

  it('should return false in an impossible situation', () => {
    const r1 = new Restaurant('Test 1', 3, 0);
    const r2 = new Restaurant('Test 2', 3, 0);
    const order = new OrderBruteForce(10);
    expect(order.calculateOrders(r1, r2)).to.equal(false);
  });

  it('should return an object containing orders if successful', () => {
    const r1 = new Restaurant('Test 1', 3, 6);
    const r2 = new Restaurant('Test 2', 3, 6);
    const order = new OrderBruteForce(10);
    expect(order.calculateOrders(r1, r2)).to.deep.equal({
      order: {
        'Test 1': { other: 6, veggie: 0, gluten: 0 },
        'Test 2': { other: 4, veggie: 0, gluten: 0 },
      },
      rating: 3,
    });
  });

  it('should successfully order specialized meals', () => {
    const r1 = new Restaurant('Test 1', 3, 6, { veggie: 2 });
    const r2 = new Restaurant('Test 2', 3, 6, { veggie: 1, gluten: 5 });
    const order = new OrderBruteForce(0, { veggie: 3, gluten: 5 });
    expect(order.calculateOrders(r1, r2)).to.deep.equal({
      order: {
        'Test 1': { other: 0, veggie: 2, gluten: 0 },
        'Test 2': { other: 0, veggie: 1, gluten: 5 },
      },
      rating: 3,
    });
  });

  it('should successfully order specialized meals if the priority needs to be flipped', () => {
    const r1 = new Restaurant('Test 1', 3, 6, { veggie: 3, gluten: 6 });
    const r2 = new Restaurant('Test 2', 3, 6, { veggie: 6 });
    const order = new OrderBruteForce(0, { veggie: 6, gluten: 6 });
    expect(order.calculateOrders(r1, r2)).to.deep.equal({
      order: {
        'Test 1': { other: 0, veggie: 0, gluten: 6 },
        'Test 2': { other: 0, veggie: 6, gluten: 0 },
      },
      rating: 3,
    });
  });

  it('should order from the highest rated restaurants first', () => {
    const r1 = new Restaurant('Test 1', 3, 20, { veggie: 10, gluten: 10 });
    const r2 = new Restaurant('Test 2', 4, 6, { veggie: 1, gluten: 1 });
    const r3 = new Restaurant('Test 3', 5, 6, { veggie: 3, gluten: 3 });
    const order = new OrderBruteForce(6, { veggie: 4, gluten: 4 });
    expect(order.calculateOrders(r1, r2, r3)).to.deep.equal({
      order: {
        'Test 1': { other: 2, veggie: 0, gluten: 0 },
        'Test 2': { other: 4, veggie: 1, gluten: 1 },
        'Test 3': { other: 0, veggie: 3, gluten: 3 },
      },
      rating: 4.3,
    });
  });
});
