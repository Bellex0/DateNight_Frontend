import React, { Component } from 'react';
import Favorites from '../components/Favorites'

export class FavoritesContainer extends Component {

    state = {
        favorites: [],
        token: localStorage.token
    }

    componentDidMount = () => {
        fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/favorites`)
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
         const faveRecipeList = this.state.favorites.map(favoriteRecipe => <Favorites favorite={favoriteRecipe} mount={this.mount}/>)

        return (
            <div>
                 <h1>Favorite Recipes</h1>
                 {faveRecipeList}
            
            </div>
        )
    }
}

export default FavoritesContainer
