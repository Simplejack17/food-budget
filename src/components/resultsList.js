import React, { Component } from 'react'
import ListItem from './listItem'

import '../css/resultsList.css'

class ResultsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: this.props.restaurants
    }
  }

  render () {
    const restaurants = this.state.restaurants.map(restaurant => <ListItem key={restaurant.R.res_id} restaurant={restaurant} />);

    return (
      <div>
        <h3>Potential Matches</h3>
        {restaurants}
      </div>
    )
  }
}


export default ResultsList
