import React, { Component } from 'react';
import CardsList from './components/CardsList';
import FilterPanel from './components/FilterPanel';

class App extends Component {
  constructor(props) {
    super(props);
    this.baseCoords = {lat: 55.7536232, long: 37.6199775};
  }

  state = {
    cars: null,
    isLoading: false
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetch('http://localhost:3000/data/cars.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTimeout(() => {
          this.setState({ isLoading: false, cars: this.upgradeData(data) })
        }, 100)
      })
  }

  upgradeData = (data) => {
    return data.map((item) => {
      return {...item, distance: item.dealer.latitude && item.dealer.longitude ? this.getDistance(this.baseCoords.lat, this.baseCoords.long, item.dealer.latitude, item.dealer.longitude) : null}
    })
  }

  /**
   * Get distance
   * @param lat1
   * @param lon1
   * @param lat2
   * @param lon2
   * @returns {number}
   */
  getDistance = (lat1,lon1,lat2,lon2) => {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.round(d * 10) / 10;
  }

  render() {
    const {isLoading, cars} = this.state;

    return (
      <div className="inner">
        <div id="map"></div>
        <FilterPanel />
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(cars) && <CardsList data={cars}/>}
      </div>
    );
  }
}

export default App;
