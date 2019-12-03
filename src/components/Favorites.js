import React, { Component } from 'react';
import {Card, Button} from 'semantic-ui-react';

export class Favorites extends Component {

    state = {
        apiKey: process.env.REACT_APP_SPOON_API_KEY,
        apiRecipeInstructions:{},
        ingredientList: [],
        recipeDetails:"",
        recipeSteps:[],
        isMissingIngredients: false,
        isMissingInstructions: false,
        apiAllIngredients: [],
        apiMatchingIngredients: [],
        apiMissedIngredients: [],
        apiFormattedReturnedRecipes: "",

    }

    deleteAnswer = () => {
        console.log("delete");
        fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/favorites/${this.props.favorite.id}`, {
            method: "DELETE",
        })
        .then(r => {
            this.props.mount()
        })
    }

    faveRecipeSteps = () => {
        fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${this.state.apiKey}&ids=${this.props.favorite.recipe_api_id}`)
        .then(res => res.json())
        .then(recipeInstructions => {
            console.log(recipeInstructions)
            this.setState(
              {
                apiRecipeInstructions: recipeInstructions[0]
              },
              () => {
                const recipe = this.state.apiRecipeInstructions;
                console.log(
                  "apiRecipeInstructions: ",
                  this.state.apiRecipeInstructions
                );
    
                const recipeDetails = (
                    <div style={{"display":"inline-block"}}>
                  <div style={{"border-style":"solid"}} className="recipe-details">
                    {recipe.preparationMinutes ? (
                      <h3>{`Prep Time : ${recipe.preparationMinutes} minutes`}</h3>
                    ) : null}
                    {recipe.cookingMinutes ? (
                      <h3>{`Cook Time : ${recipe.cookingMinutes} minutes`}</h3>
                    ) : null}
                    <h3>{`Amount of Ingredients: ${recipe.extendedIngredients.length}`}</h3>
                    <h3>{`Number of Servings: ${recipe.servings}`}</h3>
                    {recipe.dishTypes.length > 0 ? (
                      <h3>{`Category: ${recipe.dishTypes[0]}`}</h3>
                    ) : null}
                  </div>
                  
                   {this.listMissingIngredients(recipe.extendedIngredients)}
                   </div>
                );
    
                this.setState({ recipeDetails: recipeDetails });
    
                if (recipe.instructions) {
                  this.setState({
                    recipeSteps: recipe.analyzedInstructions[0].steps
                  });
                } else {
                  this.setState({ isMissingInstructions: true });
                }
              }
            );
          })
        }

        listMissingIngredients = extendedIngredients => {
            let allIngredients = [];
            extendedIngredients.forEach(ingredient => {
              allIngredients.push(ingredient.name);
            });
            this.setState({ apiAllIngredients: [...new Set(allIngredients)] }, () => {
              console.log("List of apiAllIngredients: ", this.state.apiAllIngredients);
              console.log("ingredientList: ", this.state.ingredientList);
        
              let matchingArray = [];
              this.state.apiAllIngredients.map(ingredient => {
                return this.state.ingredientList.forEach(elem => {
                  if (ingredient.includes(elem) || elem.includes(ingredient))
                    matchingArray.push(ingredient);
                });
              });
        
              this.setState({ apiMatchingIngredients: [...new Set(matchingArray)] });
        
              let missingIngredients = this.state.apiAllIngredients.filter(
                obj => matchingArray.indexOf(obj) === -1
              );
        
              console.log("missingIngredients: ", missingIngredients);
              return this.setState({ apiMissedIngredients: missingIngredients });
            });
          }
    
    

    render() {
        const ingredientList3 = this.state.apiMatchingIngredients.map(ingredient => (
            <button
              type="text"
              disabled
              className="matching-ingredient"
            >
              {ingredient}
            </button>
        ))

        const ingredientList2 = this.state.apiMissedIngredients.map(ingredient => (
            <button
              type="text"
              disabled
              className="missing-ingredient"
            >
              {ingredient}
            </button>
          ))

        let recipeList = this.state.recipeSteps.map(recipe => (
                <p
                  className="instruction-steps"
                >{`${recipe.number} ${recipe.step}`}</p>
              )
            )
            
        return (

            <div style={{'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap', 'justify-content': 'space-around', 'align-items': 'space-around', 'height': '100%', 'margin-top': '16px'}}>
                <Card>
               {this.props.favorite.title}
               <img src={`${this.props.favorite.image}`} onClick={this.faveRecipeSteps}></img>
               <Button className="delete-fave" data-id={`${this.props.favorite.id}`}
               onClick={this.deleteAnswer} 
               >❌ Delete </Button>
               </Card>
               <div>
               {this.state.recipeDetails}
               {ingredientList3}
               {ingredientList2}
               {recipeList}
               </div>
            </div>
        )
    }
}

export default Favorites
