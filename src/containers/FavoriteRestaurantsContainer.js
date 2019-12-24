import React, { Component } from 'react';
import FavoriteRestaurants from '../components/FavoriteRestaurants'

export class FavoriteRestaurantsContainer extends Component {
    
    state = {
        favoritePlaces: [],
        token: localStorage.token
    }

    componentDidMount = () => {
        fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/favorite_places`)
        .then(res => res.json())
        .then(favoritesData => {
            console.log(favoritesData)
            this.setState({
                favoritePlaces: favoritesData
            })
        })
    }

    mount =() => {
        this.componentDidMount()
    }

    render() {

        // const favePlacesList = this.state.favoritePlaces.map(favoritePlace => <FavoriteRestaurants favePlace={favoritePlace} mount={this.mount}/>)

        let placeList = this.state.favoritePlaces.length > 0 ? (
        this.state.favoritePlaces.map(favoritePlace => { return (<FavoriteRestaurants favePlace={favoritePlace} mount={this.mount}/>)}))
        : 
        (<h4 style={{"color":"#f1e3f1", "margin-top": "40px"}}>You don't have any favorites right now. Get to it!</h4>)
         

        return (
            <div>
                <h1 style={{"color":"#f1e3f1", "font-family":"Emilys Candy", "font-size":"40px"}}>Favorite Places</h1>
                
                {placeList}
                
            </div>
        )
    }
}

export default FavoriteRestaurantsContainer
