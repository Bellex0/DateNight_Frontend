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
        fetch(`https://datenight-api.herokuapp.com/user/${localStorage.loggedInUserId}/favorites/${this.props.favorite.id}`, {
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
                    <div style={{"display":"inline-block" }}>
                  <div className="recipe-details" style={{"font-size":"20px", "padding":"20px"}}>
                    {recipe.preparationMinutes ? (
                      <h4 id="normal"><b>{`Prep Time : ${recipe.preparationMinutes} minutes`}</b></h4>
                    ) : null}
                    {recipe.cookingMinutes ? (
                      <h4 id="normal"><b>{`Cook Time : ${recipe.cookingMinutes} minutes`}</b></h4>
                    ) : null}
                    <h4 id="normal"><b>{`Amount of Ingredients: ${recipe.extendedIngredients.length}`}</b></h4>
                    <h4 id="normal"><b>{`Number of Servings: ${recipe.servings}`}</b></h4>
                    {recipe.dishTypes.length > 0 ? (
                      <h4 id="normal"><b>{`Category: ${recipe.dishTypes[0]}`}</b></h4>
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
            id="normal"
            style={{"font-size":"14px", "margin":"4px", "background-color":"white", "color":"black"}}
              type="text"
              disabled
              className="matching-ingredient"
            >
              {ingredient}
            </button>
        ))

        const ingredientList2 = this.state.apiMissedIngredients.map(ingredient => (
            <button
            id="normal"
            style={{"font-size":"14px", "margin":"4px", "background-color":"white", "color":"black"}}
              type="text"
              disabled
              className="missing-ingredient"
            >
              {ingredient}
            </button>
          ))

        let recipeList = this.state.recipeSteps.map(recipe => (
                <p
                id="normal"
                style={{"font-size":"20px", "padding":"10px"}}
                  className="instruction-steps"
                >{`${recipe.number} ${recipe.step}`}</p>
              )
            )
            
        return (

            <div style={{'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap', 'justify-content': 'space-around', 'align-items': 'space-around', 'height': '100%', 'margin-top': '16px'}}>
                <Card >
               <h5 id="normal" style={{"font-size":"24px"}}><b>{this.props.favorite.title}</b></h5>
               <img src={`${this.props.favorite.image}`} onClick={this.faveRecipeSteps}></img>
               <Button className="delete-fave" id="normal" style={{"font-size":"18px"}} data-id={`${this.props.favorite.id}`}
               onClick={this.deleteAnswer} 
               >❌ Delete </Button>
               </Card>
               <div>
                 <div style={{"border-style":"solid", "text-align":"center", 'align-items': 'space-around', "margin":"20px", "background-color":"#ecd6ce" }}>
                
               {this.state.recipeDetails}
               {ingredientList3}
               {ingredientList2}
               {recipeList}
               </div>
               </div>
            </div>
        )
    }
}

export default Favorites
