import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './CardsList.module.scss';
import Card from '../Card';
import { connect } from 'react-redux'

class CardsList extends Component {

  renderCards = () => {
    const { data, filter } = this.props;

    return data.sort(function(a, b){ 
      switch (filter) {
        case 'price':
          return a.price - b.price
          break;
        case 'distance':
          if (a.distance == null) return 1
          if (b.distance == null) return -1
          if (a.distance < b.distance) return -1
          if (a.distance > b.distance) return 1
          return 0
          break;
        default:
          return
      }
    }).map((item) => {
      return (
        <div key={item.id} className={styles['cards-list__item']}> 
          <Card data={item}/>
        </div>
      )
    })
  }

  render() {
    return (
      <div className={styles['cards-list']}>
        {this.renderCards()}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    filter: store.filter.filter,
  }
}

CardsList.propTypes = {
  data: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(CardsList);
