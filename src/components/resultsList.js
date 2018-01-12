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
      <div className='PotentialMatches container'>
        <div>
          <h3 className="PotentialMatches">Potential Matches</h3>
        </div>
        <div className='resultsList'>
          {restaurants}
        </div>
      </div>
    )
  }
}


export default ResultsList
