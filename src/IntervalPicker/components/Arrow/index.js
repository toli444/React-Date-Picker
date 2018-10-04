import React, {Component} from 'react';
import styles from './styles.less';
import PropTypes from 'prop-types';

class Arrow extends Component {
  static propTypes = {
    left: PropTypes.bool,
    double: PropTypes.bool,
    onClick: PropTypes.func,
  };

  getArrow() {
    if (this.props.left) {
      return this.props.double ? '<<' : '<';
    }

    return this.props.double ? '>>' : '>';
  }

  render() {
    return <div onClick={this.props.onClick} className={styles.arrow}>{this.getArrow()}</div>
  }
}

export default Arrow;
