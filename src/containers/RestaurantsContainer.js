import React, { Component } from 'react';
import RestaurantSearchForm from '../components/RestaurantSearchForm';
import Restaurants from '../components/Restaurants';


export class RestaurantsContainer extends Component {


    render() {
        

        return (
            <div>
                <h1> Explore new places to dine here! 🍽 </h1>
               
                <RestaurantSearchForm />
                <Restaurants />

               
            </div>
        )
    }
}


export default RestaurantsContainer
