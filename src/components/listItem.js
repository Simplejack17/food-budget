import React, { Component } from 'react'

import '../css/listItem.css'

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurant: this.props.restaurant
    }
    console.log(this.state);
  }

  render () {

    return (
      <div>
        <h3>{this.state.restaurant.name}</h3>
        <p>Average Cost for 2: {this.state.restaurant.average_cost_for_two}</p>
        <div className="restaurantImage">
          <img alt="not found" src={ this.state.restaurant.featured_image ? this.state.restaurant.featured_image : "https://d30y9cdsu7xlg0.cloudfront.net/png/11637-200.png"} />
        </div>
      </div>
    )
  }
}


export default ListItem
