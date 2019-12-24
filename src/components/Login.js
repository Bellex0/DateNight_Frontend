import React, { Component } from 'react';



export class Login extends Component {
    state = {
        logIn: false,
        username: "",
        password: "",
        errors: [],
        name: "", 
        location: "",
        // image: ""
      }
    
      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }



      fileInput = React.createRef();
    
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

      //   username: this.state.username, 
          //   password: this.state.password,
          //   name: this.state.name,
          //   location: this.state.location, 
          //   image: this.state.image
    
      signupSubmit = (event) => {
        event.preventDefault()
        let formData = new FormData()
        formData.append('username', this.state.username)
        formData.append('password', this.state.password)
        formData.append('name', this.state.name)
        formData.append('location', this.state.location)
        formData.append('image', this.fileInput.current.files[0])
        fetch("http://localhost:3000/signup", {
          method: "POST",
          body: formData
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

    //  imageSubmit = (e) => {
    //    e.preventDefault()
       
    //    formData.append('image', this.fileInput.current.files[0])
    //    this.addPhoto(formData)
    //  }

    render() {
        return <>
    <h1 class="animated infinite flash delay-5s" id="title" style={{"font-size": "60px", "color":"#f1e3f1" }}><b>Date Night🌹</b></h1><br/>
    <h2 id="title" style={{"font-size": "32px", "color":"#f1e3f1"   }}><b>"What do you want to eat?" "Idk babe, what do you wanna eat?"<br/>
      - repeat 10x</b> </h2><br/>
      <ul>
        {
          this.state.errors.map(error => <li style={{"font-family":"Open Sans Condensed", "color":"white", "font-size":"30px"}}>{ error }</li>)
        }
      </ul>
      {
        this.state.logIn 
        ? 
        <section style={{"border-style":"solid", "padding":"40px", "background-color":"#ecd6", "font-weight":"bold" }} className="container">
          <h2 id="title" style={{"font-size": "40px", "color":"black" }}><b>Log In</b></h2>
          <button className="formbutton" style={{"font-family":"Emilys Candy", "font-size":"14 px", 'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px'}} 
          onClick={ () => this.setState({ logIn: false }) }>Sign Up</button><br/>
          <br/><form className="form-signin" onSubmit={ this.logInSubmitted }>
            <div>
            <label  id="label" style={{"font-family":"Emilys Candy", "font-size":"24 px", "color":"black"}} htmlFor="log_in_username">Username</label>
            <input  id="log_in_username" 
                    type="text" 
                    onChange={ this.handleChange /* for controlled form input status */ } 
                    name="username"
                    placeholder="existing username" 
                    value={ this.state.username /* for controlled form input status */ } 
                    />
                    </div>
              <div>
            <label  id="label" style={{"font-family":"Emilys Candy", "font-size":"24 px", "color":"black", "font-weight":"bold"}} htmlFor="log_in_password">Password</label>
            <input  id="log_in_password" 
                    type="password" 
                    onChange={ this.handleChange } 
                    name="password" 
                    placeholder="existing password"
                    value={ this.state.password } 
                    />
            </div>
            <input class="formbutton" style={{'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px', "font-family":"Emilys Candy", "font-size":"16 px"}} type="submit" />
          </form>
        </section>
        :
        <section style={{"border-style":"solid", "padding":"40px", "background-color":"#ecd6", "font-weight":"bold"}}>
          <h2 id="title" style={{"font-size": "40px", "color":"black" }}><b>Sign Up to Find New Recipes <span>&</span> Places to Eat! </b></h2><br/>
          <button className="formbutton" style={{"font-family":"Emilys Candy", "font-size":"36 px", 'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px'}}onClick={ () => this.setState({ logIn: true }) }>Already have an account</button><br/>
          <br/>
          <form onSubmit ={this.signupSubmit} >
            <div>
            <label  style={{"font-family":"Emilys Candy", "font-size":"24 px"}} htmlFor="sign_up_username">Username</label>
            <input  id="sign_up_username" 
                    type="text" 
                    onChange={ this.handleChange } 
                    name="username" 
                    placeholder="new username"
                    value={ this.state.username } />
                    </div>
                    <div>
            <label  style={{"font-family":"Emilys Candy", "font-size":"24 px"}} htmlFor="sign_up_password">Password</label>
            <input  id="sign_up_password" 
                    type="password" 
                    onChange={ this.handleChange } 
                    name="password" 
                    placeholder="new password"
                    value={ this.state.password } />
                    </div>
                    <div>
            <label style={{"font-family":"Emilys Candy", "font-size":"24 px"}}>Name</label>   
            < input id="sign_up_name" 
                    type="text" 
                    onChange={ this.handleChange } 
                    name="name" 
                    value={ this.state.name } />   <br/>
         
            <label style={{"font-family":"Emilys Candy", "font-size":"24 px"}}>Location</label>   
            < input id="sign_up_location" 
                    type="text" 
                    onChange={ this.handleChange } 
                    name="location" 
                    value={ this.state.location } />   <br/>
          
            <label style={{"margin-left":"40px", "font-family":"Emilys Candy", "font-size":"24 px"}}>Image</label>
            <input style={{"margin-left":"24px", "font-size":"16px"}} id="normal" type="file" name="image" required ref={this.fileInput} />
           
            </div>
          
          

            <input className="formbutton" style={{"font-family":"Emilys Candy", "font-size":"16 px", 'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px'}} type="submit" />
          </form>
        
        </section>
      }
    </>
    }
}

export default Login
