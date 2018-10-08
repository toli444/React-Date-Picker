import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.less';
import { VisibilityFilters, setVisibilityFilter, unsetVisibilityFilter } from '../../actions';

class VacationFilters extends Component {
  static propTypes = {
    setVisibilityFilter: PropTypes.func,
    unsetVisibilityFilter: PropTypes.func,
  };

  state = {
    filters: [{
      label: 'Past',
      value: VisibilityFilters.PAST,
      checked: true,
    }, {
      label: 'Current',
      value: VisibilityFilters.CURRENT,
      checked: true,
    }, {
      label: 'Future',
      value: VisibilityFilters.FUTURE,
      checked: true,
    }]
  };

  handleChange(e, index) {
    const newFilters = this.state.filters.concat();
    const filter = newFilters[index];
    filter.checked = e.target.checked;

    if (filter.checked) {
      this.props.setVisibilityFilter(filter.value);
    } else {
      this.props.unsetVisibilityFilter(filter.value);
    }

    this.setState({filters: newFilters})
  }

  render() {
    return (
      <div className={styles.filters}>
        <label>Filters: </label>
        <ul>
          {this.state.filters.map((filter, index) => (
            <li key={filter.value}>
              <label>
                <input
                  type="checkbox"
                  value={filter.value}
                  checked={filter.checked}
                  onChange={e => this.handleChange(e, index)}
                />
                {filter.label}
              </label>
            </li>)
          )}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter)),
  unsetVisibilityFilter: filter => dispatch(unsetVisibilityFilter(filter)),
});

export default connect(null, mapDispatchToProps)(VacationFilters);
