import React, { Component } from 'react'

export class Profile extends Component {
    render() {
        return (
            <div>
                <h1>Hey Hungry Hungry Hippo</h1>
                <h1>Welcome {this.props.username}!</h1>
            
                </div>
        )
    }
}

export default Profile
