import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './FilterPanel.module.scss';
import { connect } from 'react-redux'
import { setFilter } from '../../actions/PageActions.js'


class FilterPanel extends Component {

  onRadioChange = (e) => {
    this.props.setFilterAction(e.currentTarget.value)
  }

  render() {
    const {filter} = this.props;

    return (
      <div className={styles['filter-panel']}>
        <span className={styles['filter-panel__text']}>Сортировать</span>
        <label>
          <input 
            className={styles['filter-panel__radio-btn']}
            type="radio"
            value="price"
            checked={filter === "price"}
            onChange={this.onRadioChange} 
          />
          <span>По цене</span>
        </label>
        <label>
          <input 
            className={styles['filter-panel__radio-btn']}
            type="radio"
            value="distance"
            checked={filter === "distance"}
            onChange={this.onRadioChange}
          />
          <span>По удалённости</span>
        </label>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    filter: store.filter.filter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setFilterAction: filter => dispatch(setFilter(filter))
  }
}

FilterPanel.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilterAction: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
