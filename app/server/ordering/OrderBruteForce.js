import OrderBase from './OrderBase';

export default class OrderBruteForce extends OrderBase {
  calculateOrders(...restaurantsRaw) {
    const restaurants = super.calculateOrders(restaurantsRaw);
  }
}
