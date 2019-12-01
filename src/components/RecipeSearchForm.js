import React, { Component } from 'react';
import {Card, Segment, Container, Form, Input, Header, TextArea} from 'semantic-ui-react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

export class RecipeSearchForm extends Component {

    state = {
        apiKey: "c14f3b0dda974d148e50242280f22004",
        username: "",
        ingredient: "",
        ingredientList: [],
        apiReturnedRecipes: [],
        apiFormattedReturnedRecipes: "",
        isMissingIngredients: false,
        isMissingInstructions: false,
        apiAllIngredients: [],
        apiMatchingIngredients: [],
        apiMissedIngredients: [],
        apiRecipeInstructions: {},
        recipeDetails: "",
        recipeSteps: [], 
        visible: true,
        modalIsOPen: false
      };

      //For the Modal

      toggleAlert() {
          this.setState({
              visible: !this.state.visible
          })
      }

      toggleModal() {
          this.setState({
              modalIsOPen: !this.state.modalIsOPen
          })
      }

      handleIngredientSubmit = event => {
        event.preventDefault();
        this.setState(
          {
            ingredientList: [
              ...new Set([...this.state.ingredientList, this.state.ingredient])
            ],
            ingredient: ""
          },
          () =>
            this.setState({
              ingredientList: this.state.ingredientList.map(ingredient =>
                ingredient
                  .replace(/ +/g, " ")
                  .replace(/[&\\/#!,+()|@^`_$=;~%.'":*?<>{}[\-[\]']+/g, "")
                  .trim()
              )
            })
        );
      };

      handleIngredientInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      }

      renderIngredient = () => {
        return this.state.ingredientList.map(ingredient => (
          <div
            disabled
            className="delete-ingredient"
            onClick={event => this.deleteIngredient(event)}
          >
            {`${ingredient}`}
          </div>        
        ));
      };

      deleteIngredient = event => {
        event.persist();
        console.log(event.target.textContent);
        let filteredIngredients = this.state.ingredientList.filter(
          ingredient => ingredient !== event.target.textContent
        );
        this.setState({ ingredientList: filteredIngredients });
      }

      //Gets Recipes and renders recipes

      findRecipe = event => {
        event.preventDefault();
        let ingredientsString = "";
        this.state.ingredientList.map(
          ingredient => (ingredientsString += `,+${ingredient}`)
        )
    let queryString = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString.substring(
          2
        )}&number=50&apiKey=${this.state.apiKey}`
    
        fetch(queryString)
          .then(res => res.json())
          .then(fetchedApiData => {
            fetchedApiData.sort(
              (recp1, recp2) =>
                recp1.missedIngredientCount - recp2.missedIngredientCount
            )
    
            this.setState({ apiReturnedRecipes: fetchedApiData })
    
            console.log(
              "List of apiReturnedRecipes: ",
              this.state.apiReturnedRecipes
            )
            
            const apiFormattedReturnedRecipes = this.state.apiReturnedRecipes.map(
              data =>
                data.missedIngredientCount === 0 ? (
                  <div
                    className="recipe-results"
                    onClick={() => this.getRecipeDetails(data.id)}
                    style={{"border-style":"solid", "padding": "16px"}}
                  >
                    <h2>{data.title}</h2>
                    <img
                      className="recipe-results-img"
                      src={data.image}
                      alt={data.title}
                      height="231"
                      width="312"
                    />
                    <button style={{"margin-right":"10px"}} onClick={this.toggleModal.bind(this)}>See Recipe Details</button>
                    <button
                      className="favorite-button"
                      onClick={event => this.favoriteRecipe(event, data)}
                      height="100"
                      width="100">
                      ❣️ Favorite! </button>
                  </div>
                ) : (
                  <div
                    className="recipe-results"
                    onClick={() => this.getRecipeDetails(data.id)}
                    style={{"border-style":"solid", "padding": "16px"}}
                  >
                    <h2>{data.title}</h2>
                    {this.state.apiMissedIngredients.length > 0 ? (
                      <h4>
                        Missing Ingredients :{" "}
                        {this.state.apiMissedIngredients.length}
                      </h4>
                    ) : (
                      <h4>Missing Ingredients : {data.missedIngredientCount}</h4>
                    )}
                    {this.state.isMissingInstructions && (
                      <h4>
                        Missing Instructions{" "}
                      </h4>
                    )}
                    <img
                      className="recipe-results-img"
                      src={data.image}
                      alt={data.title}
                      height="231"
                      width="312"
                    /><br/>
                    <button style={{"margin-right":"10px"}} onClick={this.toggleModal.bind(this)}>See Recipe Details</button>
                    <button
                      className="favorite-button"
                      onClick={event => this.favoriteRecipe(event, data)}
                      height="100"
                      width="100">
                      ❣️ Favorite! </button>
                    {missingStuff()}
                  </div>
                )
            );
            this.setState({
              apiFormattedReturnedRecipes: apiFormattedReturnedRecipes
            });
          })
          .catch(err => console.error(err));
    
        let missingStuff = () => {
          this.setState({ isMissingIngredients: true });
        };
      };

      //Add to Favorites

      favoriteRecipe = (event, recipeData) => {
        event.stopPropagation();
        console.log("Favorited Recipe: ", recipeData);
        alert(`Added ${recipeData.title} to Favorites ❤️ !`);
        console.log( this.props);
    
        fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json", 
            "Authorization": localStorage.token
          },
          body: JSON.stringify({
            user_id: this.props.userId,
            title: recipeData.title,
            image: recipeData.image,
            recipe_api_id: recipeData.id,
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log("favorited recipe: ", data);
          })
          .catch(error => {
            console.log(error.message);
          });
      };

      //Get Recipe Details

      getRecipeDetails = recipeId => {
        let queryString = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${this.state.apiKey}&ids=${recipeId}`;
    
        fetch(queryString)
          .then(res => res.json())
          .then(fetchedRecipeInstructions => {
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

      //Modal info, ingredients list and recipe instructions

        const ingredientList3 = this.state.apiMatchingIngredients.map(ingredient => (
            <button
              type="text"
              disabled
              className="matching-ingredient"
            >
              {ingredient}
            </button>
        ))

          let ingredientList2 = this.state.apiMissedIngredients.map(ingredient => (
            <button
              type="text"
              disabled
              className="missing-ingredient"
            >
              {ingredient}
            </button>
          ))
    
          let recipeList = this.state.recipeSteps.length > 0 ? (
            this.state.recipeSteps.map(recipe => {
              return (
                <p
                  className="instruction-steps"
                >{`${recipe.number} ${recipe.step}`}</p>
              )
              })
            ) : (
            <h4 className="no-instructions">
              Oops, Sorry! There is no recipe for this dish 😣
            </h4>
          )

        return (
            <div>
            <div>
                <Form onSubmit={(e) => this.handleIngredientSubmit(e)}>
                    <Form.Input
                        fluid
                        placeholder="What's in your fridge?" 
                        name="ingredient"
                        value={this.state.ingredient}
                        onChange={this.handleIngredientInputChange}
                    />
                <Button id="submit-button" style={{"font-family":"Emilys Candy", "border-radius": "50px"}}>Add Ingredient 🍴</Button>
                </Form>
                    {this.state.ingredientList.length > 0 && (
                        <div className="ingredient-box">
                            {this.renderIngredient()}
                            <a
                                href="/#"
                                className="search"
                                onClick={event => this.findRecipe(event)}
                            >
                                Do your magic!
                            </a>
            </div>
            )}
             </div>
        <div style={{'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap', 'justify-content': 'space-around', 'align-items': 'space-around', 'height': '100%', 'margin-top': '16px'}}>
             {this.state.apiFormattedReturnedRecipes}
             </div>
             

<Modal isOpen={this.state.modalIsOPen}>
    <ModalHeader toggle={this.toggleModal.bind(this)}>What About This?</ModalHeader>
    <ModalBody>{this.state.recipeDetails}
    {ingredientList3}
    {ingredientList2}
    {recipeList}
    </ModalBody>
    <ModalFooter>
    </ModalFooter>
    </Modal>
    </div>
    
                    
        )
    }

}








export default RecipeSearchForm
