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
                restaurants: yelpData.businesses
            })
            console.log(yelpData.businesses)
    
    
        const foundPlaces = this.state.restaurants.map(restaurant => 
            <div style={{"borderStyle":"solid", "margin": "20px"}}>
                <h5>{Number((convert(`${restaurant.distance}`).from('m').to('mi')).toFixed(1))} miles away</h5>
                <h2>{restaurant.name}</h2>
                <h4>{restaurant.location.display_address[0]} {restaurant.location.display_address[1]} {restaurant.location.display_address[2]} </h4>
                <h4>Price: {restaurant.price}</h4>
                <h4>Rating: {restaurant.rating}</h4>
                <h6><a href={restaurant.url} target="_blank">Visit Yelp Page</a></h6>
                <img src={`${restaurant.image_url}`} style={{"width":"300px", "height":"300px"}} ></img>
                <button onClick={event => this.favoritePlace(event, restaurant)} style={{"margin":"16px"}}> ❣️ Favorite! </button>
                <button onClick={event => this.addEvent(event, restaurant)} style={{"margin":"16px"}}> Add Event! </button>
                
            </div>
        )
            this.setState({
                foundPlaces: foundPlaces
            })   
        })
    }
    
    addEvent = (event, restaurant) => {
        // event.stopPropagation();
        alert(`Added ${restaurant.name} to Events !`);
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
    
                fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/favorite_places`, {
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

            handleSort = (e) => {
                console.log(e.target.innerText)
                this.setState({
                  sortTerm: e.target.innerText
                })
              }
            
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

  // Sort the Places
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
            <div style={{"padding":"40px"}}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        placeholder= "dinner"
                        label="Looking for..."
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
                 
                  
                <Button onClick={this.findPlace} id="submit-button" style={{"font-family":"Emilys Candy", "border-radius": "50px", "font-size":"16px"}}>Let's go! 💃🏻</Button>
                </Form>
{/* 
                <Form onSubmit={this.handleOtherSubmit} >
                    <Form.Group inline>
                    <label>Sort by: </label>
                    <Form.Field
                        control= {Radio}
                        label='Price'
                        value='Price'
                        checked={this.state.sortTerm === 'Price'}
                        onChange={this.handleSort}
                    />
                    
                    {/* {(evt) => this.setSortTerm(evt.target.value)} */}
                    {/* <Form.Field
                     control= {Radio}
                        label='Rating'
                        value='Rating'
                        checked={this.state.sortTerm === 'Rating'}
                        onChange={this.handleSort}
                    />  */}
                    {/* </Form.Group> */}
                   
                
                <div>
        {this.state.foundPlaces}
        {/* {this.sortFood()} */}
        {/* {foundPlaces} */}
        </div>
        

            </div>
            

        )
    }
}

export default RestaurantSearchForm
