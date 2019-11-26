import React, { Component } from 'react';
import RecipesContainer from './RecipesContainer';
import RestaurantsContainer from './RestaurantsContainer';
import FavoritesContainer from './FavoritesContainer';
import EventsContainer from './EventsContainer';
import {Link} from 'react-router-dom'



export class MainPage extends Component {
    render() {
        return (
            <div>
                <h1>Hey {this.props.username}!</h1>
                <h3>What's the plan for tonight?</h3>
                <button><Link to="/recipes">Eat In</Link></button> <br/>
                <button><Link to="/restaurants">Go Out</Link></button> <br/>
                <button><Link to="/events">My Events</Link></button> <br/>
                <button><Link to="/favorites">My Favorites</Link></button> <br/>
                <button><Link to="/profile">Profile</Link></button> <br/>
                

            </div>
        )
    }
}

export default MainPage
