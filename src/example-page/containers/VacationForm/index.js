import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {addVacation} from '../../actions/index';
import IntervalPicker from '../../../components/IntervalPicker/index';

import styles from './styles.less';

class VacationForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    format: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      startDate: null,
      endDate: null,
    };

    this.baseState = this.state
  }

  resetForm = () => {
    this.setState(this.baseState)
  };

  handleNameChange = value => {
    this.setState({name: value});
  };

  handleStartDateChange = value => {
    this.setState({startDate: value});
  };

  handleEndDateChange = value => {
    this.setState({endDate: value});
  };

  handleFormSubmit = e => {
    e.preventDefault();

    this.props.dispatch(addVacation(this.state));
    //this.resetForm();
  };

  render() {
    const {name, startDate, endDate} = this.state;

    return (
      <div className={styles.form}>
        <form
          onSubmit={this.handleFormSubmit}
        >
          <div className={styles['form-element']}>
            <label htmlFor="name">Name: </label>
            <input className={styles.field} id="name" value={name}
              onChange={e => this.handleNameChange(e.target.value)}
            />
          </div>
          <div className={styles['form-element']}>
            <IntervalPicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={this.handleStartDateChange}
              onEndDateChange={this.handleEndDateChange}
              format={this.props.format}
            />
          </div>
          <button type="submit" className={styles.submit}>
            Save vacation
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(VacationForm)
