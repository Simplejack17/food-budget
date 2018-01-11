import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery';
import ReactLoading from 'react-loading'

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
      restaurants_under_budget: 0,
      restaurants: [],
      isLoading: false
    };

    this.searchByAddress = this.searchByAddress.bind(this);
    this.resetState = this.resetState.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  searchByAddress(latitude, longitude, radius, budget, start) {
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
        radius: radius,
        start: start
      }
    })
      .then((response) => {
        this.setState({
          total_restaurants: response.data.results_found
        })
        let restaurantsArray = response.data.restaurants;
        let counter = 0;
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
              restaurants: restaurantState,
              restaurants_under_budget: this.state.restaurants_under_budget+1
            });
          }
        }

        if (start < this.state.total_restaurants) {
           this.searchByAddress(latitude, longitude, radius, budget, start+20)
         }
         this.setState({
           isLoading: false
         });
         console.log("All Results:", this.state.restaurants);
         return;

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
      restaurants_under_budget: 0,
      restaurants: []
    })
  }
  isLoading() {
     this.setState({
       isLoading: true
     })
   }


  render () {
    return (
      <div>
      <h1 className='title'> Food Budget App </h1>
      <Search searchAddressArea={this.searchByAddress} resetState={this.resetState} isLoading={this.isLoading} />
        { this.state.isLoading === true ?
          <div id="loadingSpinnerContainer">
            <ReactLoading id="loadingSpinner" type="spin" color="#444"></ReactLoading>
          </div>
          : ''
        }
        { this.state.restaurants.length > 10 && this.state.isLoading === false ?
          <div>
            <p>{this.state.total_restaurants} Restaurants found in your area</p>
            <p>{this.state.restaurants_under_budget} are in your budget range</p>
            <ResultsList restaurants={this.state.restaurants}></ResultsList>
          </div>
          : ''
        }

      </div>
    )
  }
}


export default FrontPage
