import React, { Component } from 'react';
import Favorites from '../components/Favorites';
import FavoriteRestaurants from '../components/FavoriteRestaurants'

export class FavoritesContainer extends Component {

    state = {
        favorites: [],
        token: localStorage.token
    }

    componentDidMount () {
        fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/favorites`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(favoritesData => {
            console.log(favoritesData)
            this.setState({
                favorites: favoritesData
            })
        })
    }

    mount =() => {
        this.componentDidMount()
    }

   

    // deleteRecipe = (evt) => {
    //     console.log(evt.target.className)
    //     if (evt.target.className === "ui button delete-fave"){
    //         let deleteList = this.state.favorites.filter(favorite => favorite.id != evt.target.dataset.id ) 
    //         this.setState({
    //             favorites: deleteList
    //         })
    //     }
    // }

    render() {
        // let favePlaces = this.state.favorites.filter(favorite => favorite.recipe_api_id === null)
        // console.log(favePlaces)
        //  const faveRecipeList = this.state.favorites.map(favoriteRecipe => <Favorites favorite={favoriteRecipe} mount={this.mount}/>)

         let faveRecipeList = this.state.favorites.length > 0 ? (
            this.state.favorites.map(favoriteRecipe => { return (<Favorites favorite={favoriteRecipe} mount={this.mount}/>)}))
            : 
            (<h4 style={{"color":"#f1e3f1", "margin-top": "40px"}}>You don't have any favorites right now. Get to it!</h4>)

        return (
            <div >
                 <h1 style={{"color":"#f1e3f1", "font-family":"Emilys Candy", "font-size":"40px"}}>Favorite Recipes</h1>
                 {faveRecipeList}

            
            </div>
        )
    }
}

export default FavoritesContainer
