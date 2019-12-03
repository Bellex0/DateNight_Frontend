import React, { Component } from 'react'; 
import {Card, Button} from 'semantic-ui-react';

export class FavoriteRestaurants extends Component {

  

    deleteAnswer = () => {
        console.log("delete");
        fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/favorite_places/${this.props.favePlace.id}`, {
            method: "DELETE",
        })
        .then(r => {
            this.props.mount()
        })
    }

   

    render() {
        return (
          
                <div style={{'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap', 'justify-content': 'space-around', 'align-items': 'space-around', 'height': '100%', 'margin-top': '16px'}}>
                    <Card>
                    <h3>{this.props.favePlace.name}</h3>
                    <h5>{this.props.favePlace.location} </h5>
                    <h5>Price: {this.props.favePlace.price}</h5>
                    <h5>Rating: {this.props.favePlace.rating}</h5>
                    <img src={`${this.props.favePlace.image}`} height="200px" width="250px" ></img>
                    <h6><a href={this.props.favePlace.url} target="_blank">Visit Yelp Page</a></h6><br/>
                    <Button className="delete-fave" data-id={`${this.props.favePlace.id}`}
                    onClick={this.deleteAnswer} 
                    >❌ Delete </Button>
                    </Card>
                    </div>
           
        )
    }
}

export default FavoriteRestaurants







