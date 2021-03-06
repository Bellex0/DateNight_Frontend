import React, { Component } from 'react';
import { Form, Button, Radio } from 'semantic-ui-react'
import Restaurants from './Restaurants';
var convert = require('convert-units')

export class RestaurantSearchForm extends Component {

    state = {
        apiKey: process.env.REACT_APP_YELP_API_KEY,
        term: "",
        location: "",
        category: "",
        restaurants: [], 
        foundPlaces: [], 
        sortTerm: ""
    }
    
    handleSubmit = evt => {
        evt.preventDefault();
        this.setState({
            term: this.state.term,
            location: this.state.location, 
            category: this.state.category
          })
        }
    
        handleOtherSubmit = evt => {
            evt.preventDefault();
            this.setState({
               sortTerm: this.state.sortTerm
              })
            }
    
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value})
    }
    
    findPlace = evt => {
        evt.preventDefault()
        let searchTerm = this.state.term
        let searchCategory = this.state.category
        let searchLocation = this.state.location
    
        fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchTerm}&location=${searchLocation}&category=${searchCategory}`, {
            headers: {
                "Authorization": `Bearer ${this.state.apiKey}`
            }
        })
        .then(res => res.json())
        .then(yelpData => {
            yelpData.businesses.sort(
                (rest1, rest2) => rest1.distance - rest2.distance
            )
            this.setState({
                restaurants: yelpData.businesses,
                term: "", 
                location: "",
                category: ""
            })
            console.log(yelpData.businesses)
    
    
        const foundPlaces = this.state.restaurants.map(restaurant => 
            <div style={{"background-color":"#ecd6ce", "width": "60%", "borderStyle":"solid", "margin": "20px", "display": "flex", "flexDirection": "row", "justifyContent": "center"}}>
                <div style={{'margin-right': '24px', "margin-top":"16px", "padding":"16px"}}>
                    <h2 id="normal" >{Number((convert(`${restaurant.distance}`).from('m').to('mi')).toFixed(1))} miles away</h2>
                    <h1 style={{"font-size":"40px" }} id="normal"><b>{restaurant.name}</b></h1>
                    <h3 style={{"font-size":"22px"}} id="normal">{restaurant.location.display_address[0]} {restaurant.location.display_address[1]} {restaurant.location.display_address[2]} </h3>
                    <iframe width="300" height="170" frameborder="0" marginheight="0" marginwidth="0" 
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${restaurant.coordinates.latitude},${restaurant.coordinates.longitude}`} />
                    <h3 style={{"font-size":"22px"}} id="normal">Price: {restaurant.price}</h3>
                    <h3 style={{"font-size":"22px"}} id="normal">Rating: {restaurant.rating}</h3>
                    <h4 id="normal"><a href={restaurant.url} target="_blank">Visit Yelp Page</a></h4>
                </div>
                <div style={{'display': 'flex', 'flexDirection': 'column'}}>
                    <img src={`${restaurant.image_url}`} style={{"width":"300px", "height":"300px", "margin-top":"16px"}} ></img>
                    <div style={{'display': 'flex', 'flexDirection': 'row'}}>
                        <button className="recipe-buttons" onClick={event => this.favoritePlace(event, restaurant)} style={{"margin":"16px", "border-radius":"40px", "padding":"10px"}}> ❣️ Favorite! </button>
                        <button className="recipe-buttons" onClick={event => this.addEvent(event, restaurant)} style={{"margin":"16px", "border-radius":"40px", "padding":"10px"}}> 🎊 Add Event! </button>
                    </div>
                </div>
                
                
            </div>
        )
            this.setState({
                foundPlaces: foundPlaces
            })   
        })
    }
    
    addEvent = (event, restaurant) => {
        // event.stopPropagation();
        alert(`Added ${restaurant.name} to Events 🎈!`);
        console.log( this.props);
    
        fetch(`https://datenight-api.herokuapp.com/user/${localStorage.loggedInUserId}/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json", 
            "Authorization": localStorage.token
          },
          body: JSON.stringify({
            user_id: this.props.userId,
            date: "",
            time: "",
            location: restaurant.location.display_address[1],
            content: restaurant.name,
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log("event: ", data);
          })
        //   .catch(error => {
        //     console.log(error.message);
        //   });
      };
    
            favoritePlace = (event, restaurant) => {
                event.stopPropagation();
                console.log("Favorited Place: ", restaurant);
                alert(`Added ${restaurant.name} to Favorites ❤️!`);
                console.log( this.props);
    
                fetch(`https://datenight-api.herokuapp.com/user/${localStorage.loggedInUserId}/favorite_places`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json", 
                    "Authorization": localStorage.token
                },
                body: JSON.stringify({
                    user_id: this.props.userId,
                    name: restaurant.name,
                    image: restaurant.image_url,
                    location: restaurant.location.display_address[1],
                    price: restaurant.price,
                    rating: restaurant.rating,
                    url: restaurant.url
                })
                })
                .then(res => res.json())
                .then(data => {
                    console.log("favorited place: ", data);
                })
                .catch(error => {
                    console.log(error.message);
                });
            };

            // handleSort = (e) => {
            //     console.log(e.target.innerText)
            //     this.setState({
            //       sortTerm: e.target.innerText
            //     })
            //   }
            
            //   sortFood = () => {
            //     console.log("sort")
            //     if(this.state.sortTerm === "Price"){
            //       return this.state.foundPlaces.sort((a,b) => a.Price.localeCompare(b.Price))
            //     }
            //     else if(this.state.sortTerm === "Rating"){
            //       return this.state.foundPlaces.sort((a,b) => a.Rating - b.Rating)
            //     }
            //     else{
            //       return this.state.foundPlaces
            //     }
            //   }
            


// setSortTerm = (term) => {
//     this.setState({
//       sortTerm: term
//     })
//   }

// //   Sort the Places
//   whichPlacesToRender = () => {
//       console.log("sort")
//       console.log("copiedPlaces")
//     let copiedPlaces = [...this.state.foundPlaces]
//     if (this.state.sortTerm === "Price") {
//         copiedPlaces.sort((placeA, placeB) => {
//           return placeA.price - placeB.price
//         })
//       } else if (this.state.sortTerm === "Rating") {
//         copiedPlaces.sort((placeA, placeB) => {
//           return placeA.rating.localeCompare(placeB.rating)
//         })
//       }
//       return copiedPlaces
//     }

    render() {
       
        return (
            <div style={{"padding":"40px", "font-color":"#f1e3f1"}}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group  style={{"font-size":"20px"}} widths='equal'>
                    <Form.Input
                        fluid
                        placeholder= "sushi, cocktails, brunch"
                        label="Looking for..."
                        font-color="#f1e3f1"
                        name="term"
                        value={this.state.term}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                    fluid
                    placeholder= "NYC"
                    label="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                    />
                     <Form.Input
                    fluid
                    placeholder= "bar"
                    label="Category"
                    name="category"
                    value={this.state.category}
                    onChange={this.handleChange}
                    />
                    </Form.Group>
                 
                  
                <Button onClick={this.findPlace} id="submit-button" style={{"font-family":"Emilys Candy", "border-radius": "50px", "font-size":"16px"}}>Find me cool places! 💃🏻</Button>
                </Form>

                {/* <Form onSubmit={this.handleOtherSubmit} >
                    <Form.Group inline>
                    <label>Sort by: </label>
                    <Form.Field
                        control= {Radio}
                        label='Price'
                        value='Price'
                        checked={this.state.sortTerm === 'Price'}
                        onChange={this.handleSort}
                    />
                    
                    {(evt) => this.setSortTerm(evt.target.value)} */}
                     {/* <Form.Field
                     control= {Radio}
                        label='Rating'
                        value='Rating'
                        checked={this.state.sortTerm === 'Rating'}
                        onChange={this.handleSort}
                    />   */}
                    {/* </Form.Group> */}
                    
                
                <div style={{ "margin-top":"16px",'display': 'flex', 'flexDirection': 'row', 
                'justifyContent': 'center', 'flex-wrap': 'wrap'}}>
        {this.state.foundPlaces}
        {/* {this.sortFood()} */}
        {/* {this.whichPlacesToRender()} */}
        {/* {foundPlaces} */}
        </div>
        

            </div>
            

        )
    }
}

export default RestaurantSearchForm
