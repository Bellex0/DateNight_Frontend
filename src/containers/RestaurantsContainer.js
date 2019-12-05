import React, { Component } from 'react';
import RestaurantSearchForm from '../components/RestaurantSearchForm';
import Restaurants from '../components/Restaurants';


export class RestaurantsContainer extends Component {


    render() {
        

        return (
            <div>
                <h1 id="normal" style={{"color":"#f1e3f1", "font-size":"50px"}}> <b>Explore new places to dine here! 🍽</b> </h1>
               
                <RestaurantSearchForm />
                <Restaurants />

               
            </div>
        )
    }
}


export default RestaurantsContainer
