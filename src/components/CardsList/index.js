import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './CardsList.module.scss';
import Card from '../Card';
import { connect } from 'react-redux'

class CardsList extends Component {

  getSort (ascending) {
    // if ascending, `null` will be pushed towards the end of the array by returning 1
    var nullPosition = ascending ? 1 : -1
    return function (a, b) {
      // if a is null, push it towards whichever end null elements should end up
      if (a == null) return nullPosition
      
      // Note: at this point, a is non-null (previous if statement handled that case).
      //
      // If b is null, it must therefore be placed closer to whichever end the null
      // elements should end up on. If ascending, null elements are pulled towards
      // the right end of the array. If descending, null elements are pulled towards
      // the left.
      //
      // Therefore, we return -nullPosition. If ascending, this is -1, meaning a comes
      // before b; if descending, this is 1, meaning a comes after b. This is
      // clearly the correct behavior, since ascending will push b, which is null,
      // towards the end of the array (with -1) and descending will push b towards
      // the beginning of the array.
      if (b == null) return -nullPosition
  
      // OTHERWISE, both elements are non-null, so sort normally.
      // if a < b AND
      //     if ascending, a comes first, so return -1 == -nullPosition
      //     if descending, a comes after, so return -nullPosition == -(-1) == 1
      if (a < b) return -nullPosition
  
      // return the opposite of the previous condition
      if (a > b) return nullPosition
      
      // return 0 if both elements are equal
      return 0
    }
  }

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
