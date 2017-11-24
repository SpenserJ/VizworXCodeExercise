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

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      value: this.state.value.setIn([].concat(e.target.name), e.target.value),
    });
  };

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
      })
      .catch(() => {
        this.setState({
          status: {
            pending: false,
            error: true,
            result: { error: 'Failed to communicate with server' },
          },
        });
      });
  }

  render() {
    const { value, status } = this.state;
    let output = null;
    if (status.pending === false && Object.keys(status.result).length !== 0) {
      output = status.error
        ? <span className="error">{status.result.error}</span>
        : <pre>{JSON.stringify(status.result, null, '  ')}</pre>;
    }
    return (
      <form>
        <h1>VizworX Code Exercise</h1>
        <div className="container">
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
        </div>
        <h2>Results</h2>
        {status.pending
          ? <span className="spinner" />
          : (
            <input
              type="submit"
              value="Optimize meals"
              onClick={this.submit}
            />
          )}
        {output}
      </form>
    );
  }
}
