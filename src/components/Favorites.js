import React, { Component } from 'react';
import {Card, Button} from 'semantic-ui-react';

export class Favorites extends Component {

    deleteAnswer = () => {
        console.log("delete");
        fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/favorites/${this.props.favorite.id}`, {
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
               {this.props.favorite.title}
               <img src={`${this.props.favorite.image}`}></img>
               <Button className="delete-fave" data-id={`${this.props.favorite.id}`}
               onClick={this.deleteAnswer} 
               >❌ Delete </Button>
               </Card>
            </div>
        )
    }
}

export default Favorites
