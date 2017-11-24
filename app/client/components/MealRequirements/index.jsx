import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

const noop = () => {};

export default class MealRequirements extends React.PureComponent {
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
      <div className="pageSplit">
        <h2>Meal Requirements</h2>
        <label htmlFor="totalMeals">
          <span>Total Meals</span>
          <input
            type="number"
            min="0"
            max="1000"
            id="totalMeals"
            name="total"
            value={this.props.value.get('total')}
            onChange={this.onChange}
          />
        </label>
        <label htmlFor="vegetarianMeals">
          <span>Vegetarian Meals</span>
          <input
            type="number"
            min="0"
            max="1000"
            id="vegetarianMeals"
            name="specialization|veggie"
            value={this.props.value.getIn(['specialization', 'veggie'])}
            onChange={this.onChange}
          />
        </label>
        <label htmlFor="glutenFreeMeals">
          <span>Gluten-free Meals</span>
          <input
            type="number"
            min="0"
            max="1000"
            id="glutenFreeMeals"
            name="specialization|gluten"
            value={this.props.value.getIn(['specialization', 'gluten'])}
            onChange={this.onChange}
          />
        </label>
      </div>
    );
  }
}
