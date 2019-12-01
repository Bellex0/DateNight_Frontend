import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter, NavLink } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './containers/MainPage';
import Profile from './components/Profile';
import EventsContainer from './containers/EventsContainer'; 
import FavoritesContainer from './containers/FavoritesContainer'; 
import RestaurantsContainer from './containers/RestaurantsContainer'; 
import RecipesContainer from './containers/RecipesContainer'; 
import FavoriteRestaurantsContainer from './containers/FavoriteRestaurantsContainer'; 



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

  render() {
    const name = this.state.username
  return (
    <div className="App">
      
            
              <nav class="navbar" style={{'margin-bottom': '24px'}}>
                
                    <div className= "logo1" style = {{"width":"20px"}} >
                        <img src="rhetort.jpg" width="130" height="60" style={{"margin":"-9px"}}></img>
                    </div>
                <ul class="main-nav" id="js-menu">
                  <li>
                  {this.state.username ? <a  href="/main" class="nav-links"> Home
                       </a>: null}
                    {/* <a  href="/main" class="nav-links"> Home
                       </a> */}
                  </li>
                 
                  <li>
                    <a onClick={this.logOutClicked} href="#" class="nav-links">Log Out </a>
                  </li>
                  <li>
                    <a onClick={this.goBack} href="#" class="nav-links"> Go Back </a>
                  </li>
                  <li>
                  
                  {/* <a href= class="nav-links">Git Backend </a> */}
                  <i class="fa fa-github" style={{"font-size":"20px"}}></i>
                  </li>
                  <li>
                 
                    {/* <a href= class="nav-links">Git Frontend</a> */}
                    
                  </li>
                </ul>
              </nav>
         
      <Switch>
        <Route exact path='/' render={(routerProps) => {return <Login gotToken={this.gotToken} {...routerProps}/>}} />
        <Route path={'/main'} render={routerProps => <MainPage {...routerProps} username={this.state.username}/>} />
        <Route path={'/profile'} render={routerProps => <Profile {...routerProps} username={this.state.username}/>} />
        <Route path={'/events'} component={EventsContainer} />
        <Route path={'/favorite_recipes'} component={FavoritesContainer} />
        <Route path={'/favorite_places'} component={FavoriteRestaurantsContainer} />
        <Route path={'/restaurants'} component={RestaurantsContainer} />
        <Route path={'/recipes'} component={RecipesContainer} />

      </Switch>
     
    </div>
  )
  }

}
export default withRouter(App);