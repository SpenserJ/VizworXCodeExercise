import React from 'react';
import { fromJS } from 'immutable';

import MealRequirements from '../MealRequirements/';
import Restaurants from '../Restaurants/';

export default class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      value: fromJS({
        requirements: {
          total: 50,
          specialization: {
            veggie: 5,
            gluten: 7,
          },
        },
        restaurants: {
          'Restaurant A': {
            total: 40,
            specialization: { veggie: 4 },
            rating: 5,
          },
          'Restaurant B': {
            total: 100,
            specialization: { veggie: 20, gluten: 20 },
            rating: 3,
          },
        },
      }),
    };
  }

  onChange = e => this.setState({
    value: this.state.value.setIn(e.target.name, e.target.value),
  });

  render() {
    return (
      <div>
        <h1>VizworX Code Exercise</h1>
        <MealRequirements
          name="requirements"
          onChange={this.onChange}
          value={this.state.value.get('requirements')}
        />
        <Restaurants
          name="restaurants"
          onChange={this.onChange}
          value={this.state.value.get('restaurants')}
        />
      </div>
    );
  }
}
