import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

const noop = () => {};

export default class Restaurants extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.instanceOf(Map).isRequired,
  };

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

  render() {
    return (
      <div>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
