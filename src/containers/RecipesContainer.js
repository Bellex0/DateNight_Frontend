import React, { Component } from 'react'
import Recipes from '../components/Recipes'
import RecipeSearchForm from '../components/RecipeSearchForm'

export class RecipesContainer extends Component {



    render() {
        return (
            <div>
                <h1 style={{"margin-top":"90px", "color":"#f1e3f1", "font-family":'Open Sans Condensed', "font-size":"50px"}}>Dinner at home? Don't forget the candlelight 🕯 </h1><br/>
                <h3 style={{"color":"#f1e3f1", "margin-bottom":"30px", "font-family":'Open Sans Condensed', "font-size":"30px"}}>Enter each ingredient one at a time</h3>
                <RecipeSearchForm />
                <Recipes />
                
            </div>
        )
  
    }

}

export default RecipesContainer