import React, { Component } from 'react';
import {Card, Button} from 'semantic-ui-react';

export class Favorites extends Component {

    state = {
        apiKey: "c14f3b0dda974d148e50242280f22004",
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

    getRecipeDetails = recipeId => {
        console.log("hello")
        let queryString = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${this.state.apiKey}&ids=${this.props.favorite.recipe_api_id}`;
    
        fetch(queryString)
          .then(res => res.json())
          .then(fetchedRecipeInstructions => {
              console.log(fetchedRecipeInstructions)
            this.setState(
              {
                apiRecipeInstructions: fetchedRecipeInstructions[0]
              },
              () => {
                const recipe = this.state.apiRecipeInstructions;
    
                console.log(
                  "apiRecipeInstructions: ",
                  this.state.apiRecipeInstructions
                );
    
                const recipeDetails = (
                  <div className="recipe-details">
                    <img src={this.props.favorite.image} alt={this.props.favorite.title} />
                    <h1>{this.props.favorite.title}</h1>
                    {this.props.favorite.preparationMinutes ? (
                      <h3>{`Prep Time : ${this.props.favorite.preparationMinutes} minutes`}</h3>
                    ) : null}
                    {this.props.favorite.cookingMinutes ? (
                      <h3>{`Cook Time : ${this.props.favorite.cookingMinutes} minutes`}</h3>
                    ) : null}
                    <h3>{`Amount of Ingredients: ${this.props.favorite.extendedIngredients.length}`}</h3>
                    <h3>{`Number of Servings: ${this.props.favorite.servings}`}</h3>
                    {this.props.favorite.dishTypes.length > 0 ? (
                      <h3>{`Category: ${this.props.favorite.dishTypes[0]}`}</h3>
                    ) : null}
                    <div className="recipe-ingredient-image">
                      {this.props.favorite.extendedIngredients.map(ingredient => {
                        return (
                          <img
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${this.props.favorite.image}`}
                            alt="recipe ingredient"
                          />
                        );
                      })}
                    </div>
                    {this.listMissingIngredients(this.props.favorite.extendedIngredients)}
                  </div>
                );
    
                this.setState({ recipeDetails: recipeDetails });
    
                if (this.props.favorite.instructions) {
                  this.setState({
                    recipeSteps: this.props.favorite.analyzedInstructions[0].steps
                  });
                } else {
                  this.setState({ isMissingInstructions: true });
                }
              }
            );
          })
          .catch(err => console.error(err));
      };

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

        return (
            <div style={{'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap', 'justify-content': 'space-around', 'align-items': 'space-around', 'height': '100%', 'margin-top': '16px'}}>
                <Card>
               {this.props.favorite.title}
               <img src={`${this.props.favorite.image}`} onClick={this.getRecipeDetails}></img>
               <Button className="delete-fave" data-id={`${this.props.favorite.id}`}
               onClick={this.deleteAnswer} 
               >❌ Delete </Button>
               </Card>
               {this.recipeDetails}
            </div>
        )
    }
}

export default Favorites
