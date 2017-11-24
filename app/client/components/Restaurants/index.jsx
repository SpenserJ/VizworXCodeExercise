import React from 'react';
import PropTypes from 'prop-types';
import { fromJS, Map } from 'immutable';
import memoize from 'lodash.memoize';

const noop = () => {};

export default class Restaurants extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.instanceOf(Map).isRequired,
  };

  constructor() {
    super();
    this.state = { newRestaurant: '' };
  }

  onChange = (e) => {
    e.preventDefault();
    this.props.onChange({
      preventDefault: noop,
      target: {
        name: [this.props.name].concat(e.target.name.split('|')),
        value: e.target.value,
      },
    });
  }

  deleteRestaurant = memoize(name => (e) => {
    e.preventDefault();
    this.props.onChange({
      preventDefault: noop,
      target: {
        name: this.props.name,
        value: this.props.value.delete(name),
      },
    });
  });

  updateNewRestaurant = (e) => {
    e.preventDefault();
    this.setState({ newRestaurant: e.target.value });
  };

  addRestaurant = (e) => {
    e.preventDefault();
    this.props.onChange({
      preventDefault: noop,
      target: {
        name: [this.props.name, this.state.newRestaurant.replace(/|/g, '')],
        value: fromJS({
          total: 0,
          specialization: {},
          rating: 3,
        }),
      },
    });
    this.setState({ newRestaurant: '' });
  };

  render() {
    return (
      <div className="pageSplit">
        <h2>Restaurants</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Meals</th>
              <th>Vegetarian Meals</th>
              <th>Gluten-free Meals</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {this.props.value.entrySeq().map(([name, data]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    name={`${name}|total`}
                    onChange={this.onChange}
                    value={data.get('total')}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    name={`${name}|specialization|veggie`}
                    onChange={this.onChange}
                    value={data.getIn(['specialization', 'veggie'], 0)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    name={`${name}|specialization|gluten`}
                    onChange={this.onChange}
                    value={data.getIn(['specialization', 'gluten'], 0)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    name={`${name}|rating`}
                    onChange={this.onChange}
                    value={data.get('rating')}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    onClick={this.deleteRestaurant(name)}
                    value="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <input
                  type="text"
                  value={this.state.newRestaurant}
                  onChange={this.updateNewRestaurant}
                />
              </td>
              <td>
                <input
                  type="button"
                  onClick={this.addRestaurant}
                  value="Add"
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
