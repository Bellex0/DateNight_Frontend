import React, { Component } from 'react'
import Recipes from '../components/Recipes'
import RecipeSearchForm from '../components/RecipeSearchForm'

export class RecipesContainer extends Component {

//     state = {
//         apiKey: "c14f3b0dda974d148e50242280f22004",
//         username: "",
//         ingredient: "",
//         ingredientList: [],
//         apiReturnedRecipes: [],
//         apiFormattedReturnedRecipes: "",
//         isMissingIngredients: false,
//         isMissingInstructions: false,
//         apiAllIngredients: [],
//         apiMatchingIngredients: [],
//         apiMissedIngredients: [],
//         apiRecipeInstructions: {},
//         sideBarWidth: "0",
//         recipeDetails: "",
//         recipeSteps: []
//       };

//       handleIngredientSubmit = event => {
//         event.preventDefault();
//         this.setState(
//           {
//             ingredientList: [
//               ...new Set([...this.state.ingredientList, this.state.ingredient])
//             ],
//             ingredient: ""
//           },
//           () =>
//             this.setState({
//               ingredientList: this.state.ingredientList.map(ingredient =>
//                 ingredient
//                   .replace(/ +/g, " ")
//                   .replace(/[&\\/#!,+()|@^`_$=;~%.'":*?<>{}[\-[\]']+/g, "")
//                   .trim()
//               )
//             })
//         );
//       };

//       handleIngredientInputChange = event => {
//         const { name, value } = event.target;
//         this.setState({ [name]: value });
//       }

//       findRecipe = event => {
//         event.preventDefault();
//         let ingredientsString = "";
//         this.state.ingredientList.map(
//           ingredient => (ingredientsString += `,+${ingredient}`)
//         );
    
//         let queryString = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString.substring(
//           2
//         )}&number=50&apiKey=${this.state.apiKey}`;
    
//         fetch(queryString)
//           .then(res => res.json())
//           .then(fetchedApiData => {
//             fetchedApiData.sort(
//               (recp1, recp2) =>
//                 recp1.missedIngredientCount - recp2.missedIngredientCount
//             );
    
//             this.setState({ apiReturnedRecipes: fetchedApiData });
    
//             console.log(
//               "List of apiReturnedRecipes: ",
//               this.state.apiReturnedRecipes
//             );
    
//             const apiFormattedReturnedRecipes = this.state.apiReturnedRecipes.map(
//               data =>
//                 data.missedIngredientCount === 0 ? (
//                   <div
//                     className="recipe-results"
//                     onClick={() => this.getRecipeDetails(data.id)}
//                   >
//                     <h1>{data.title}</h1>
//                     <img
//                       className="recipe-results-img"
//                       src={data.image}
//                       alt={data.title}
//                       height="231"
//                       width="312"
//                     />
//                     <img
//                       className="recipe-results-img-favorite"
//                       onClick={event => this.favoriteRecipe(event, data)}
//                       src="https://i.ibb.co/YcLQTDJ/favorite-button.png"
//                       alt="Favorite"
//                       height="200"
//                       width="200"
//                     />
//                   </div>
//                 ) : (
//                   <div
//                     className="recipe-results"
//                     onClick={() => this.getRecipeDetails(data.id)}
//                   >
//                     <h1>{data.title}</h1>
//                     {this.state.apiMissedIngredients.length > 0 ? (
//                       <h2>
//                         Missing Ingredients :{" "}
//                         {this.state.apiMissedIngredients.length}
//                       </h2>
//                     ) : (
//                       <h2>Missing Ingredients : {data.missedIngredientCount}</h2>
//                     )}
//                     {this.state.isMissingInstructions && (
//                       <h2>
//                         Missing Instructions{" "}
//                         <span role="img" aria-label="Sad Emoji">
//                           😓
//                         </span>
//                       </h2>
//                     )}
//                     <img
//                       className="recipe-results-img"
//                       src={data.image}
//                       alt={data.title}
//                       height="231"
//                       width="312"
//                     />
//                     <img
//                       className="recipe-results-img-favorite"
//                       onClick={event => this.favoriteRecipe(event, data)}
//                       src="https://i.ibb.co/YcLQTDJ/favorite-button.png"
//                       alt="Favorite"
//                       height="200"
//                       width="200"
//                     />
//                     {needToGoShopping()}
//                   </div>
//                 )
//             );
//             this.setState({
//               apiFormattedReturnedRecipes: apiFormattedReturnedRecipes
//             });
//           })
//           .catch(err => console.error(err));
    
//         let needToGoShopping = () => {
//           this.setState({ isMissingIngredients: true });
//         };
//       };

//       renderIngredient = () => {
//         return this.state.ingredientList.map(ingredient => (
//           <div
//             disabled
//             className="ingredient-button pulse"
//             onClick={event => this.deleteIngredient(event)}
//           >
//             {`${ingredient}`}
//           </div>
//         ));
//       };

//       deleteIngredient = event => {
//         event.persist();
//         console.log(event.target.textContent);
//         let filteredIngredients = this.state.ingredientList.filter(
//           ingredient => ingredient !== event.target.textContent
//         );
//         this.setState({ ingredientList: filteredIngredients });
//       }

//       getRecipeDetails = recipeId => {
//         let queryString = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${this.state.apiKey}&ids=${recipeId}`;
    
//         fetch(queryString)
//           .then(res => res.json())
//           .then(fetchedRecipeInstructions => {
//             this.setState(
//               {
//                 apiRecipeInstructions: fetchedRecipeInstructions[0]
//               },
//               () => {
//                 const recipe = this.state.apiRecipeInstructions;
    
//                 console.log(
//                   "apiRecipeInstructions: ",
//                   this.state.apiRecipeInstructions
//                 );
    
//                 const recipeDetails = (
//                   <div className="recipe-details">
//                     <img src={recipe.image} alt={recipe.title} />
//                     <h1>{recipe.title}</h1>
//                     {recipe.preparationMinutes ? (
//                       <h3>{`Prep Time : ${recipe.preparationMinutes} minutes`}</h3>
//                     ) : null}
//                     {recipe.cookingMinutes ? (
//                       <h3>{`Cook Time : ${recipe.cookingMinutes} minutes`}</h3>
//                     ) : null}
//                     <h3>{`# Ingredients: ${recipe.extendedIngredients.length}`}</h3>
//                     <h3>{`# Servings: ${recipe.servings}`}</h3>
//                     {recipe.dishTypes.length > 0 ? (
//                       <h3>{`Dish Type: ${recipe.dishTypes[0]}`}</h3>
//                     ) : null}
//                     <div className="recipe-ingredient-image">
//                       {recipe.extendedIngredients.map(ingredient => {
//                         return (
//                           <img
//                             src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
//                             alt="recipe ingredient"
//                           />
//                         );
//                       })}
//                     </div>
//                     {this.listMissingIngredients(recipe.extendedIngredients)}
//                   </div>
//                 );
    
//                 this.setState({ recipeDetails: recipeDetails });
    
//                 if (recipe.instructions) {
//                   this.setState({
//                     recipeSteps: recipe.analyzedInstructions[0].steps
//                   });
//                 } else {
//                   this.setState({ isMissingInstructions: true });
//                 }
    
//                 this.setState({ sideBarWidth: "40vw" });
//               }
//             );
//           })
//           .catch(err => console.error(err));
//       };

//       listMissingIngredients = extendedIngredients => {
//         let allIngredients = [];
//         extendedIngredients.forEach(ingredient => {
//           allIngredients.push(ingredient.name);
//         });
//         this.setState({ apiAllIngredients: [...new Set(allIngredients)] }, () => {
//           console.log("List of apiAllIngredients: ", this.state.apiAllIngredients);
//           console.log("ingredientList: ", this.state.ingredientList);
    
//           let matchingArray = [];
//           this.state.apiAllIngredients.map(ingredient => {
//             return this.state.ingredientList.forEach(elem => {
//               if (ingredient.includes(elem) || elem.includes(ingredient))
//                 matchingArray.push(ingredient);
//             });
//           });
    
//           this.setState({ apiMatchingIngredients: [...new Set(matchingArray)] });
    
//           let missingIngredients = this.state.apiAllIngredients.filter(
//             o => matchingArray.indexOf(o) === -1
//           );
    
//           console.log("missingIngredients: ", missingIngredients);
//           return this.setState({ apiMissedIngredients: missingIngredients });
//         });
//       };


//     render() {
//         return (
//             <div>
//             <div>
//                 <Recipes showRecipe={this.getRecipeDetails()}/>
//                 <RecipeSearchForm handleSubmit={this.handleSubmit} handleChange={this.handleIngredientInputChange}                
//                  <Form onSubmit={(e) => this.handleIngredientSubmit(e)}>
//                     <Form.Input
//                         fluid
//                         placeholder="What's in your fridge?" 
//                         name="ingredient"
//                         value={this.state.ingredient}
//                         onChange={this.handleIngredientInputChange}
//                     />
//                 <Button id="submit-button" style={{"font-family":"Special Elite", "border-radius": "50px"}}>Add</Button>
//                 </Form>
//                     {this.state.ingredientList.length > 0 && (
//                         <div className="ingredient-box">
//                             {this.renderIngredient()}
//                             <a
//                                 href="/#"
//                                 className="search"
//                                 onClick={event => this.findRecipe(event)}
//                             >
//                                 Find Recipes
//                             </a>
//             </div>
//             )}
//              </div>
//         <div>
//              {this.state.apiFormattedReturnedRecipes}
//              </div>
             

// <aside
// className="sidebar"
// style={{ width: `${this.state.sideBarWidth}` }}
// >
// <img
//   className="closebtn"
//   src="https://i.ibb.co/T822SpD/arrow.png"
//   alt="Back Arrow"
//   onClick={() => this.setState({ sideBarWidth: "0" })}
// />
// {this.state.recipeDetails}

// <div className="ingredient-list">
//   <h3>Ingredients List:</h3>
//   {this.state.apiMatchingIngredients.map(ingredient => (
//     <button
//       type="text"
//       disabled
//       className="matching-ingredient"
//     >
//       {ingredient}
//     </button>
//   ))}
//   {this.state.apiMissedIngredients.map(ingredient => (
//     <button
//       type="text"
//       disabled
//       className="missing-ingredient"
//     >
//       {ingredient}
//     </button>
//   ))}
// </div>

// {this.state.recipeSteps.length > 0 ? (
//   this.state.recipeSteps.map(recipe => {
//     return (
//       <p
//         className="instruction-steps"
//       >{`${recipe.number} ${recipe.step}`}</p>
//     );
//   })
// ) : (
//   <h2 className="no-instructions">
//     Sorry, no instructions for this recipe
//   </h2>
// )}
// </aside>
// </div>

//     )
       
    
//     }
// }
    

    

    render() {
        return (
            <div>
                <h1>Dinner at home? Sounds nice 🕯 </h1>
                <h3>Enter each ingredient one at a time</h3>
                <RecipeSearchForm />
                <Recipes />
                {/* ingredient={this.state.ingredient} handleSubmit={this.handleIngredientSubmit} handleChange={this.handleIngredientInputChange} */}
            </div>
        )
  
    }

}

export default RecipesContainer