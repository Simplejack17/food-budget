import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery';

import Search from '../components/search'
import ResultsList from '../components/resultsList'

import '../css/frontpage.css'

class FrontPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      radius: 10000,
      budget: 0,
      total_restaurants: 0,
      restaurants: [],
    };

    this.searchByAddress = this.searchByAddress.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  searchByAddress(latitude, longitude, radius, budget) {
    // console.log("Lat", latitude);
    // console.log("Long", longitude);

    axios.get("https://developers.zomato.com/api/v2.1/search", {
      headers: {
        'user-key': '7a6a8a2de6aa306f165cacd29b2909ab',
        'Accept': 'application/json'
      },
      params: {
        lat: latitude,
        lon: longitude,
        radius: radius
      }
    })
      .then((response) => {
        console.log(response)
        let total_restaurants = response.data.results_found;
        let restaurantsArray = response.data.restaurants;
        console.log(restaurantsArray);

        for (let i = 0; i < restaurantsArray.length; i++) {
          let average_cost_for_two = restaurantsArray[i].restaurant.average_cost_for_two;
          console.log("Average Cost", average_cost_for_two);
          console.log(budget);
          // console.log(id);
          let restaurantState = this.state.restaurants;
          // this.searchRestaurant(id);

          if (average_cost_for_two < budget) {
            console.log("This item is under budget");
            restaurantState.push(restaurantsArray[i].restaurant)
            this.setState({
              total_restaurants: total_restaurants,
              restaurants: restaurantState
            });
          }
        }

        //set state of results to be the response
      })
      .catch((err) => {
        console.log(err)
      })
  }

  searchRestaurant(restarauntId) {
    axios.get("https://developers.zomato.com/api/v2.1/restaurant", {
      headers: {
        'user-key': '7a6a8a2de6aa306f165cacd29b2909ab',
        'Accept': 'application/json'
      },
      params: {
        res_id: restarauntId
      }
    })
      .then((response) => {
        //console.log(response)
        //logic for looping through menu items and checking if they are under budget
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // <Results results={this.state.results} />
  resetState() {
    this.setState({
      total_restaurants: 0,
      restaurants: []
    })
  }


  render () {
    return (
      <div>
      <h1 className='title'> Food Budget App </h1>
        <Search searchAddressArea={this.searchByAddress} resetState={this.resetState}/>
        { this.state.total_restaurants > 0 ?
          <div>
            <p>{this.state.total_restaurants} Restaurants found</p>
            <ResultsList restaurants={this.state.restaurants}></ResultsList>
          </div>
          : ''
        }

      </div>
    )
  }
}


export default FrontPage
