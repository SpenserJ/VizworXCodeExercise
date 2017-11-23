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
                <td>{data.get('total')}</td>
                <td>{data.getIn(['specialization', 'veggie'], 0)}</td>
                <td>{data.getIn(['specialization', 'gluten'], 0)}</td>
                <td>{data.get('rating')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
