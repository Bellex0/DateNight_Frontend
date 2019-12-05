import React, { Component } from 'react'

export class Profile extends Component {

    state = {
        username: "",
        name: "",
        location: "",
        image: ""
    }

    componentDidMount() {
        if (localStorage.token) {
          fetch('http://localhost:3000/profile',{
            headers: {
              'Authorization': `Bearer ${localStorage.token}`
            }
          })
          .then(res => res.json())
          .then(user => this.setState({username: user.username,
        name: user.name,
        location: user.location,
        image: user.image
        }))
        } else {
          this.props.history.push('/')
        }
      }

      deleteUser = () => {
        console.log("delete");
        if (!window.confirm("Are you sure you want to delete your account? You will lose all precious data 😱")) {
            this.props.history.push('/main')
        }
        else {
        fetch(`http://localhost:3000/users/${localStorage.loggedInUserId}`, {
            method: "DELETE",
        })
        .then(r => {
            this.props.history.push('/')
        })
    }
}

// updateUser = () => 
// fetch('http://localhost:3000/profile', {
//     method: 'PATCH', 
//     headers: 
// })

         



    render() {
        console.log(this.state)
        return (
            <div>

                <h1 style={{"color":"#f1e3f1", "font-family":"Emilys Candy"}}>Profile</h1>
                <img src={this.state.image} width="200 px" height="250 px"></img>
                


                <h2 style={{"color":"#f1e3f1", "margin-top":"30px"}}><b>Username: {this.state.username}</b></h2>
                <h2 style={{"color":"#f1e3f1"}}><b>Name: {this.state.name}</b></h2>
                <h2 style={{"color":"#f1e3f1"}}><b>Location: {this.state.location}</b></h2>
                <button id="deleteIng" style={{"font-size":"16px", "margin-left": "10px", "border-radius": "20px", "padding":"4px"}} onClick={this.deleteUser}> 🚫 Delete Account</button>

            
                </div>
        )
    }
}

export default Profile
