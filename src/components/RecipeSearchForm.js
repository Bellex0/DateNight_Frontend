import React, { Component } from 'react';
import {Card, Segment, Container, Form, Input, Header, TextArea} from 'semantic-ui-react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

export class RecipeSearchForm extends Component {

    state = {
        apiKey: process.env.REACT_APP_SPOON_API_KEY,
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
          
          <div className="normal" style={{"font-size":"28px","margin-top": "8px", "color":"#f1e3f1", "font-weight":"bold"}}
            disabled
  
            
          >
            
            {`${ingredient}`}
            <button id="deleteIng" className="normal" style={{"font-size":"16px", "margin-left": "10px", "border-radius": "20px", "padding":"4px"}} data-id={`${ingredient}`} onClick={event => this.deleteIngredient(event)}><span style={{"font-size":"8px"}}>❌</span>Delete</button>  
          </div>      
        ));
      };

      deleteIngredient = event => {
        // event.persist();
        console.log(event.target);
        let filteredIngredients = this.state.ingredientList.filter(
          ingredient => ingredient !== event.target.dataset.id
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
                  id="normal"
                  className="recipe-results"
                    onClick={() => this.getRecipeDetails(data.id)}
                    style={{"border-style":"solid", "padding": "16px", "margin-bottom":"16px", "background-color":"#ecd6"}}
                  >
                    <h2 className="normal" style={{"font-weight":"bold"}}>{data.title}</h2>
                    <img
                      className="recipe-results-img"
                      src={data.image}
                      alt={data.title}
                      height="220"
                      width="300"
                    />
                    <button id="normal" className="recipe-buttons" style={{"margin-right":"10px", "font-size": "16px", "border-radius":"40px", "padding":"10px"}} onClick={this.toggleModal.bind(this)}> 👀See Recipe Details</button>
                    <button
                    id="normal"
                      className="recipe-buttons"
                      onClick={event => this.favoriteRecipe(event, data)}
                      height="100"
                      width="100"
                      style={{"margin":"16px", "font-size": "16px", "border-radius":"40px", "padding":"10px"}}>
                      ❣️ Favorite! </button>
                      <button className="recipe-buttons" id="normal" onClick={event => this.addEvent(event, data)} height="100"
                      width="100" style={{"margin":"16px", "font-size":"16px","border-radius":"40px", "padding":"10px" }}> 🎊 Add Event!  </button>
                  </div>
                ) : (
                  <div
                  id="normal"
                    className="recipe-results"
                    onClick={() => this.getRecipeDetails(data.id)}
                    style={{"border-style":"solid", "padding": "16px", "margin-bottom":"16px", "background-color":"#ecd6"}}
                  >
                    <h2 className="normal" style={{"font-weight":"bold"}}>{data.title}</h2>
                    {this.state.apiMissedIngredients.length > 0 ? (
                      <h4 className="normal">
                        Missing Ingredients :{" "}
                        {this.state.apiMissedIngredients.length}
                      </h4>
                    ) : (
                      <h4 className="normal">Missing Ingredients : {data.missedIngredientCount}</h4>
                    )}
                    {this.state.isMissingInstructions && (
                      <h4 className="normal">
                        Missing Instructions{" "}
                      </h4>
                    )}
                    <img
                      className="recipe-results-img"
                      src={data.image}
                      alt={data.title}
                      height="231"
                      width="300"
                    /><br/>
                    <button className="recipe-buttons" id="normal" style={{"margin-right":"10px", "font-size": "16px", "border-radius":"40px", "padding":"10px"}} onClick={this.toggleModal.bind(this)}> 👀 See Recipe Details</button>
                    <button
                    id="normal"
                    className="recipe-buttons"
                      onClick={event => this.favoriteRecipe(event, data)}
                      height="100"
                      width="100"
                      style={{"margin":"16px", "font-size": "16px", "border-radius":"40px", "padding":"10px"}}>
                      ❣️ Favorite! </button>
                      <button className="recipe-buttons" id="normal" onClick={event => this.addEvent(event, data)} height="100"
                      width="100" style={{"margin":"16px", "font-size": "16px", "border-radius":"40px", "padding":"10px"}}> 🎊Add Event!  </button>
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

      //Add Event from recipe

      addEvent = (event, recipeData) => {
        event.stopPropagation();
        alert(`Added ${recipeData.title} to Events 🎈!`);
        console.log( this.props);
    
        fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json", 
            "Authorization": localStorage.token
          },
          body: JSON.stringify({
            user_id: this.props.userId,
            content: recipeData.title,
            date: "",
            time: ""
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log("event: ", data);
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
                  <div className="recipe-details" id="normal">
                    <img src={recipe.image} alt={recipe.title} width="300" height="300"/>
                    <h1 id="normal" style={{"font-weight":"bold"}}>{recipe.title}</h1>
                    {recipe.preparationMinutes ? (
                      <h4 id="normal" style={{"font-weight":"bold"}}>{`Prep Time : ${recipe.preparationMinutes} minutes`}</h4>
                    ) : null}
                    {recipe.cookingMinutes ? (
                      <h4 id="normal" style={{"font-weight":"bold"}}>{`Cook Time : ${recipe.cookingMinutes} minutes`}</h4>
                    ) : null}
                    <h4 id="normal" style={{"font-weight":"bold"}}>{`Amount of Ingredients: ${recipe.extendedIngredients.length}`}</h4>
                    <h4 id="normal" style={{"font-weight":"bold"}}> {`Number of Servings: ${recipe.servings}`}</h4>
                    {recipe.dishTypes.length > 0 ? (
                      <h4 id="normal" style={{"font-weight":"bold"}}>{`Category: ${recipe.dishTypes[0]}`}</h4>
                    ) : null}
                    <div id="normal" className="recipe-ingredient-image">
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
              style={{"margin":"10px"}}
            >
              {ingredient}
            </button>
        ))

          let ingredientList2 = this.state.apiMissedIngredients.map(ingredient => (
            <button
              type="text"
              disabled
              className="missing-ingredient"
              style={{"margin":"10px"}}
            >
              {ingredient}
            </button>
          ))
    
          let recipeList = this.state.recipeSteps.length > 0 ? (
            this.state.recipeSteps.map(recipe => {
              return (
                <p
                style={{"font-size":"16px"}}
                  className="instruction-steps"
                >{`${recipe.number} ${recipe.step}`}</p>
              )
              })
            ) : (
            <h4 id="normal" style={{"font-size":"16px"}} className="no-instructions">
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
                <Button className="grayButton" id="submit-button" style={{"font-family":"Emilys Candy", "border-radius": "50px","font-size":"16px"}}>Add Ingredient 🍴</Button>
                </Form>
                <h5 style={{"font-family":'Open Sans Condensed', "font-size":"32px", "margin-top":"26px", "color":"#f1e3f1"}}><b>Ingredients I have:</b></h5>
                    {this.state.ingredientList.length > 0 && (
                        <div className="ingredient-box">
                            {this.renderIngredient()}
                            <Button
                            style={{"margin-top":"16px", "border-radius":"30px", "font-family":"Emilys Candy", "font-size":"16px"}}
                                href="/#"
                                className="grayButton"
                                onClick={event => this.findRecipe(event)}
                            >
                                Get Yummy Recipes! 😋
                            </Button>
            </div>
            )}
             </div>
        <div style={{"margin-top":"10px", "display": 'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap', 'justify-content': 'space-around', 'align-items': 'space-around', 'height': '100%', 'margin-top': '16px'}}>
             {this.state.apiFormattedReturnedRecipes}
             </div>
             

<Modal className="normal" isOpen={this.state.modalIsOPen}>
    <ModalHeader className="normal" toggle={this.toggleModal.bind(this)}>What About This?</ModalHeader>
    <ModalBody style={{"font-size":"16px"}}>{this.state.recipeDetails}
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
