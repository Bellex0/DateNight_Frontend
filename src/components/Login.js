import React, { Component } from 'react'

export class Login extends Component {
    state = {
        logIn: false,
        username: "",
        password: "",
        errors: [],
        name: "", 
        location: "",
        image: ""
      }
    
      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
    
      logInSubmitted = (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.state.username, 
            password: this.state.password
          })
        }).then(res => res.json())
        .then(data => {
          if (data.errors) {
            this.setState({
              errors: data.errors
            })
          } else {
            this.props.history.push('/main')
            console.log(this.state.username)
            this.props.gotToken(data.token, data.user_id, this.state.username)
          }
        })
        // when fetch is done...get token
      }
    
      signupSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.state.username, 
            password: this.state.password,
            name: this.state.name,
            location: this.state.location, 
            image: this.state.image
          })
        }).then(res => res.json())
        .then(data => {
          if (data.errors) {
            this.setState({
              errors: data.errors
            })
          } else {
            this.props.history.push('/main')
            console.log(data)
            this.props.gotToken(data.token, data.user_id, this.state.username)
          }
        })
        // when fetch is done...get token
      }

      handleFile = e => {
        this.setState({ [e.target.name]: e.target.files[0] });
      }

    render() {
        return <>
    <h1 class="animated infinite pulse delay-2s" id="title" style={{"font-size": "48px" }} >Date Night🌹</h1>
    <h2 id="title" style={{"font-size": "32px" }}>"What do you want to eat tonight?" "Idk babe" </h2><br/>
      <ul>
        {
          this.state.errors.map(error => <li>{ error }</li>)
        }
      </ul>
      {
        this.state.logIn 
        ? 
        <section style={{"border-style":"solid", "padding":"40px"}} className="container">
          <h2 id="title" style={{"font-size": "24px" }}>Log In</h2>
          <button class="accountbutton" style={{"font-family":"Emilys Candy", "font-size":"14 px", 'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px'}} 
          onClick={ () => this.setState({ logIn: false }) }>Sign Up</button><br/>
          <br/><form className="form-signin" onSubmit={ this.logInSubmitted }>
            <div>
            <label  id="label" style={{"font-family":"Emilys Candy"}} htmlFor="log_in_username">Username</label>
            <input  id="log_in_username" 
                    type="text" 
                    onChange={ this.handleChange /* for controlled form input status */ } 
                    name="username"
                    placeholder="existing username" 
                    value={ this.state.username /* for controlled form input status */ } 
                    />
                    </div>
              <div>
            <label  id="label" style={{"font-family":"Emilys Candy"}} htmlFor="log_in_password">Password</label>
            <input  id="log_in_password" 
                    type="password" 
                    onChange={ this.handleChange } 
                    name="password" 
                    placeholder="existing password"
                    value={ this.state.password } 
                    />
            </div>
            <input class="submit-button" style={{'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px', "font-family":"Emilys Candy", "font-size":"16 px"}} type="submit" />
          </form>
        </section>
        :
        <section style={{"border-style":"solid", "padding":"40px"}}>
          <h2 id="title" style={{"font-size": "24px" }}>Sign up </h2><br/>
          <button class="accountbutton" style={{"font-family":"Emilys Candy", "font-size":"14 px", 'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px'}}onClick={ () => this.setState({ logIn: true }) }>Already have an account</button><br/>
          <br/>
          <form onSubmit ={this.signupSubmit} >
            <div>
            <label  style={{"font-family":"Emilys Candy", "font-size":"18 px"}} htmlFor="sign_up_username">Username</label>
            <input  id="sign_up_username" 
                    type="text" 
                    onChange={ this.handleChange } 
                    name="username" 
                    placeholder="new username"
                    value={ this.state.username } />
                    </div>
                    <div>
            <label  style={{"font-family":"Emilys Candy", "font-size":"18 px"}} htmlFor="sign_up_password">Password</label>
            <input  id="sign_up_password" 
                    type="password" 
                    onChange={ this.handleChange } 
                    name="password" 
                    placeholder="new password"
                    value={ this.state.password } />
                    </div>
                    <div>
            <label>Name</label>   
            < input id="sign_up_name" 
                    type="text" 
                    onChange={ this.handleChange } 
                    name="name" 
                    value={ this.state.name } />   
            </div>
            <div>
            <label>Location</label>   
            < input id="sign_up_location" 
                    type="text" 
                    onChange={ this.handleChange } 
                    name="location" 
                    value={ this.state.location } />   
            </div>
            <div>
            <label>Avatar</label>   
            < input id="sign_up_avatar" 
                    type="file" 
                    onChange={ this.handleFile } 
                    name="image" 
                    value={ this.state.image } />   
            </div>
            <input class="submit-button" style={{"font-family":"Emilys Candy", "font-size":"16 px", 'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px'}} type="submit" />
          </form>
        </section>
      }
    </>
    }
}

export default Login
