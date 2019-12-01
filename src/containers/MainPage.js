import React, { Component } from 'react';
import RecipesContainer from './RecipesContainer';
import RestaurantsContainer from './RestaurantsContainer';
import FavoritesContainer from './FavoritesContainer';
import EventsContainer from './EventsContainer';
import {Link} from 'react-router-dom'



export class MainPage extends Component {

    // state = {
    //     favorites: [],
    //     token: localStorage.token
    // }

    // componentDidMount = () => {
    //     fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/favorites`)
    //     .then(res => res.json())
    //     .then(favoritesData => {
    //         console.log(favoritesData)
    //         this.setState({
    //             favorites: favoritesData
    //         })
    //     })
    // }

   

    render() {
        // this.state.favorites.map(favoriteRecipe => <Favorites favorite={favoriteRecipe}/>)

        return (
            <div>
                <h1>Hey {this.props.username}!</h1>
                <h3>What's the plan for tonight?</h3><br/>
                <button style={{"padding":"20px", "marginBottom":"20px"}}><Link to="/recipes">Eat In 🏠🍝</Link></button> <br/>
                <button style={{"padding":"20px", "marginBottom":"20px"}}><Link to="/restaurants">Go Out 🍾🚕</Link></button> <br/>
                <button style={{"padding":"20px", "marginBottom":"20px"}}><Link to="/events">My Events 🎉 </Link></button> <br/>
                <button style={{"padding":"20px", "marginBottom":"20px"}}><Link to="/favorite_recipes">My Favorite Recipes 👩‍🍳</Link></button> <br/>
                <button style={{"padding":"20px", "marginBottom":"20px"}}><Link to="/favorite_places">My Favorite Places 🍷</Link></button> <br/>
                <button style={{"padding":"20px", "marginBottom":"20px"}}><Link to="/profile">Profile</Link></button> <br/>
                
                

            </div>
        )
    }
}

export default MainPage
