import React, { Component } from 'react';
import RecipesContainer from './RecipesContainer';
import RestaurantsContainer from './RestaurantsContainer';
import FavoritesContainer from './FavoritesContainer';
import EventsContainer from './EventsContainer';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import {Container, Row, Col} from 'reactstrap';
import '../App.css'



export class MainPage extends Component {
   
    render() {

        return (
            <div>
            <Container className="container" >
                <div >
                <h1 id="normal" style={{"margin-top":"90px", "color":"#f1e3f1", "font-size":"80px", "font-weight":"bold", "width":"500"}}>Hey {this.props.username}!</h1>
                <h3 id="normal" className="animated infinite pulse" style={{"color":"#f1e3f1", "font-size":"46px", "font-weight":"bold", "width":"500"}}> What's the plan for tonight?</h3><br/>
                <div style={{"margin-top":"60px"}}>
                    <Row>
               <Col><Link to="/recipes"><button className="main-buttons" style={{"padding":"20px", "marginBottom":"20px", "font-size": "36px"}} > Eat In 🏠🍝 </button></Link></Col>
               <Col><Link to="/restaurants"><button className="main-buttons" style={{"padding":"20px", "marginBottom":"20px", "font-size": "36px"}}>Go Out 🍾🚕</button></Link> </Col>
               </Row>
               <Row>
               <Col><Link to="/favorite_recipes"><button className="main-buttons" style={{"padding":"20px", "marginBottom":"20px", "font-size": "36px"}}> My Favorite Recipes 👩‍🍳</button></Link></Col>
               <Col><Link to="/favorite_places"><button className="main-buttons" style={{"padding":"20px", "marginBottom":"20px", "font-size": "36px"}}>My Favorite Places 🍷</button></Link></Col>
               </Row>
               <Row>
               <Col><Link to="/events"><button className="main-buttons" style={{ "marginBottom":"20px", "font-size": "36px"}} > My Events 🎉</button></Link></Col>
               <Col><Link to="/profile"><button className="main-buttons" style={{ "marginBottom":"20px", "font-size": "36px"}}> View Profile 👓</button></Link></Col>
               </Row>
               </div>
               </div> 

 </Container>
 </div>
        )
    }
}

export default MainPage
