import React, { Component } from 'react';
import {Card, Button} from 'semantic-ui-react';

export class Favorites extends Component {

    state = {
        apiKey: "process.env.REACT_APP_SPOON_API_KEY",
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

    fetchFavoriteRecipes = () => {
        fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/favorites`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.props.username
          })
        })
          .then(response => response.json())
          .then(fetched_DB_RecipeData => {
            this.setState({ apiReturnedRecipes: fetched_DB_RecipeData }, () =>
              this.findRecipe()
            );
          })
          .catch(err => {
            console.error(err.message);
          });
      };

      findRecipe = () => {
        console.log("List of fetched_DB_Recipes: ", this.state.apiReturnedRecipes);
    
        const apiFormattedReturnedRecipes = this.state.apiReturnedRecipes.map(
          data =>
              <div
                className="recipe-results"
                onClick={() => this.getRecipeDetails(data.recipe_api_id)}
              >
                <h1>{data.title}</h1>
                {this.state.isMissingInstructions && (
                  <h2>
                    Missing Instructions{" "}
                    <span role="img" aria-label="Sad Emoji">
                      😓
                    </span>
                  </h2>
                )}
                <img
                  className="recipe-results-img"
                  src={data.image}
                  alt={data.title}
                  height="231"
                  width="312"
                />
                {this.setState({ isMissingIngredients: true })}
              </div>
            )
        this.setState({
          apiFormattedReturnedRecipes: apiFormattedReturnedRecipes
        });
      };

    getRecipeDetails = recipeId => {
        console.log("hello")
        let queryString = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${this.state.apiKey}&ids=${recipeId}`;
    
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
                    <img src={recipe.image} alt={recipe.title} />
                    <h1>{recipe.title}</h1>
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
                    <div className="recipe-ingredient-image">
                      {recipe.extendedIngredients.map(ingredient => {
                        return (
                          <img
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                            alt="recipe ingredient"
                          />
                        );
                      })}
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
               {this.state.recipeDetails}
            </div>
        )
    }
}

export default Favorites
