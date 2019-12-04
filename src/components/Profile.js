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

                <h1 style={{"font-family":"Emilys Candy"}}>Profile</h1>
                <img src={this.state.image} width="200 px" height="250 px"></img>
                


                <h5 style={{"margin-top":"30px"}}>Username: {this.state.username}</h5>
                <h5>Name: {this.state.name}</h5>
                <h5>Location: {this.state.location}</h5>
                <button onClick={this.deleteUser}> 🚫 Delete Account</button>

            
                </div>
        )
    }
}

export default Profile
