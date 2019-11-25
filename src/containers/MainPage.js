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
                <h1> Hi Beautiful</h1>
                <li><Link to="/profile">Go to Profile</Link></li>
            </div>
        )
    }
}

export default MainPage
