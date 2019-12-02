import React, { Component } from 'react'
import Recipes from '../components/Recipes'
import RecipeSearchForm from '../components/RecipeSearchForm'

export class RecipesContainer extends Component {



    render() {
        return (
            <div>
                <h1>Dinner at home? Don't forget the candlelight 🕯 </h1><br/>
                <h3 style={{"margin-bottom":"30px"}}>Enter each ingredient one at a time</h3>
                <RecipeSearchForm />
                <Recipes />
                
            </div>
        )
  
    }

}

export default RecipesContainer