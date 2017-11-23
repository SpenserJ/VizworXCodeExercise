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
      status: {
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
      status: {
        pending: true,
        error: false,
        result: {},
      },
    });
    fetch('/computeOrder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.value.toJS()),
    })
      .then(response => response.json())
      .then((result) => {
        this.setState({
          status: {
            pending: false,
            error: !!result.error,
            result,
          },
        });
      });
  }

  render() {
    const { value, status } = this.state;
    return (
      <div>
        <h1>VizworX Code Exercise</h1>
        <MealRequirements
          name="requirements"
          onChange={this.onChange}
          value={value.get('requirements')}
        />
        <Restaurants
          name="restaurants"
          onChange={this.onChange}
          value={value.get('restaurants')}
        />
        <h2>Results</h2>
        <input
          type="submit"
          value="Optimize meals"
          onClick={this.submit}
          disabled={status.pending}
        />
        {status.error
          ? <span className="error">{status.result.error}</span>
          : <pre>{JSON.stringify(status.result, null, '\t')}</pre>}
      </div>
    );
  }
}
