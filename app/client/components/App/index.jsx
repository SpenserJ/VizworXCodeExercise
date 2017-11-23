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
      request: {
        pending: false,
        error: false,
        result: {},
      },
    };
  }

  onChange = e => this.setState({
    value: this.state.value.setIn(e.target.name, e.target.value),
  });

  submit = (e) => {
    e.preventDefault();
    this.setState({
      request: {
        pending: true,
        error: false,
        result: {},
      },
    });
    console.log('Submitting to server', this.state.value.toJS());
  }

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
        <h2>Results</h2>
        <input
          type="submit"
          value="Optimize meals"
          onClick={this.submit}
          disabled={this.state.request.pending}
        />
        {this.state.request.error
          ? <span className="error">{this.state.request.result.error}</span>
          : <pre>{JSON.stringify(this.state.request.result, null, '\t')}</pre>}
      </div>
    );
  }
}
