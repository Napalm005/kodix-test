import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './Card.module.scss';
import {formatPrice, GenerateId, declOfNum} from '../../utils.js';
import pin from './pin.svg';

class Card extends Component {
  state = {
    isShowAllFeatures: false
  }

  onMoreClick = (e) => {
    this.setState({
      isShowAllFeatures: true
    });
  }

  render() {
    const {isShowAllFeatures} = this.state;
    const {model_name, kit_name, price, features, dealer, images, distance} = this.props.data;

    return (
      <article className={styles['card']}>
        <div className={styles['card__img-wrap']}>
          <img
            className={styles['card__img']}
            src={images[0]}
            alt={`${model_name} ${kit_name}`}
          />
        </div>
        <div className={styles['card__content']}>
          <h3 className={styles['card__model-name']}>{model_name} {kit_name}</h3>
          <span className={styles['card__price']}>{formatPrice(price)}</span>
          <div className={styles['card__features']}>
            Особенности
            <ul className={styles['card__features-list']}>
              {features.slice(0, 3).map((feature) => {
                return <li key={GenerateId()} className={styles['card__features-list-item']}>{feature}</li>
              })}
              {isShowAllFeatures ? features.slice(3).map((feature) => {
                return <li key={GenerateId()} className={styles['card__features-list-item']}>{feature}</li>
              }) : null}
            </ul>
            {features.slice(3).length && !isShowAllFeatures ? <span className={styles['card__features-more']} onClick={this.onMoreClick}>Ещё {features.slice(3).length} {declOfNum(features.slice(3).length, ['особенность', 'особенности', 'особенностей'])}</span> : null}
          </div>
        </div>
        <footer className={styles['card__footer']}>
          <img src={pin} width={30} height={30} alt="pin" className={styles['card__footer-icon']} />
          <a href={dealer.url ? dealer.url : `http://rebzi.ru/UserFiles/festival/cf5a348918.11.2008%2021-39.jpg`} className={styles['card__address']}>{`${dealer.name}, ${dealer.city}${dealer.address ? `, ${dealer.address}` : ``} ${distance ? `, ${distance} км` : ``}`}</a>
        </footer>
      </article>
    );
  }
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Card;
