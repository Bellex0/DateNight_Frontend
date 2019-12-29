import React from 'react';
import logo from './logo.svg';
import Logo from './datenight.jpg'
import './App.css';
import { Route, Switch, withRouter, NavLink, Redirect, Link } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './containers/MainPage';
import Profile from './components/Profile';
import EventsContainer from './containers/EventsContainer'; 
import FavoritesContainer from './containers/FavoritesContainer'; 
import RestaurantsContainer from './containers/RestaurantsContainer'; 
import RecipesContainer from './containers/RecipesContainer'; 
import FavoriteRestaurantsContainer from './containers/FavoriteRestaurantsContainer'; 
import FourOhFour from './components/FourOhFour';


console.log(process.env.REACT_APP_SPOON_API_KEY)



class App extends React.Component {

  state = {
    loggedInUserId: null,
    token: null,
    username: null
  }

  gotToken = (token, loggedInUserId, username) => {
    
    localStorage.token = token
    localStorage.loggedInUserId = loggedInUserId
    localStorage.username = username
    this.setState({
      token,
      loggedInUserId,
      username
    })
  }

  logOutClicked = () => {
    localStorage.clear()
    this.setState({
      token: null,
      loggedInUserId: null,
      username: null
    })
    
    this.props.history.push('/')
  }

  componentDidMount(){
    console.log("componentDidMount", localStorage.token);
    if (localStorage.token) {
      this.setState({
        token: localStorage.token,
        loggedInUserId: localStorage.loggedInUserId,
        username: localStorage.username
      })
    }
  }

  goBack = () => {
    this.props.history.go(-1)
  }

  home = () => {
    this.props.history.push('/main')
  }

  render() {
    const name = this.state.username
  return (
    <div className="App">
      
            
              <nav class="navbar" >
                
                    <div className= "logo1"  >
                    
                        <img src={Logo} width="160" height="65" style={{"margin":"-9px"}} onClick={this.home}></img>
                    </div>
                <ul class="main-nav" id="js-menu">
                    <li>
                  {this.state.username ? <Link to="/main" class="nav-links">{this.state.username}</Link>:null}
                  {/* // <a href="/main" class="nav-links"> {this.state.username} 
                  //      </a>: null} */}
                     {/* <a  href="/main" class="nav-links"> Home
                       </a>  */}
                   </li> 
                 
                  <li>
                  {this.state.username ? <a onClick={this.goBack} href="#" class="nav-links"> Go Back </a>: null}
                  </li>
                  <li>
                    {this.state.username ? <a onClick={this.logOutClicked} href="#" class="nav-links">Log Out </a>: null}
                  </li>
                 
                  <li>
                  
                  <i class="fa fa-github" style={{"font-size":"20px"}}></i>
                  </li>
                  <li>
                    
                  </li>
                </ul>
              </nav>
         
      <Switch>
        <Route exact path='/' render={(routerProps) => {return <Login gotToken={this.gotToken} {...routerProps}/>}} />
        <Route exact path={'/main'} render={routerProps => <MainPage {...routerProps} username={this.state.username}/>} />
        <Route exact path={'/profile'} render={routerProps => <Profile {...routerProps} username={this.state.username}/>} />
        <Route exact path={'/events'} component={EventsContainer} />
        <Route exact path={'/favorite_recipes'} component={FavoritesContainer} />
        <Route exact path={'/favorite_places'} component={FavoriteRestaurantsContainer} />
        <Route exact path={'/restaurants'} component={RestaurantsContainer} />
        <Route exact path={'/recipes'} component={RecipesContainer} />
        <Route path="*" exact={true} component={FourOhFour}/>

      </Switch>
     
    </div>
  )
  }

}
export default withRouter(App);