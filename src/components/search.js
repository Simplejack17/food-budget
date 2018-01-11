import React, { Component } from 'react'
import $ from 'jquery';
import geocoder from "google-geocoder";

import '../css/search.css'

  //AIzaSyDtXKHvSyrR8eGDXXw6Ip0wIka_M3qJNgg

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radius: 5
    }

    this.setRadius = this.setRadius.bind(this);
  }

  handleClick = () => {
    this.props.resetState();
    // console.log(this.props);
    //Call the geocoder function to get the coordinates
    let address = $('#address-input').val();
    let radiusInMiles = $('#radius-input').val();
    let radius = radiusInMiles*1609.34;
    let budget = $("#budget-input").val();
    console.log(budget);

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    let geo = geocoder({
      key: 'AIzaSyDtXKHvSyrR8eGDXXw6Ip0wIka_M3qJNgg'
    });

    let lat;
    let lng;

    let searchByAddress = this.props.searchAddressArea;

    geo.find(address, function(err, res){
      // process response object
      // console.log(res);
      lat = res[0].location.lat;
      lng = res[0].location.lng;
      // console.log("Lat", lat);
      // console.log("Long", lng);
      searchByAddress(lat, lng, radius, budget);
      // setResults();
    });
  }

  setRadius() {
    let radius = $("#radius-input").val()
    this.setState({
      radius: radius
    })
  }

  render () {
    return (
      <div>
        <div className="searchContainer">
            <label>Address</label>
            <input id="address-input" type="text" name="address" placeholder="Enter your address"></input>
            <label>Radius: <span>{this.state.radius}</span></label>
            <input id="radius-input" type="range" name="radius" min="5" max="50" step="5" onChange={this.setRadius}></input>
            <label>Budget</label>
            <input id="budget-input" type="text" name="budget" placeholder="Enter your budget"></input>
            <div className="search-button-container">
              <button onClick={this.handleClick} id="searchButton">Search</button>
            </div>
        </div>
      </div>
    )
  }
}

export default Search
