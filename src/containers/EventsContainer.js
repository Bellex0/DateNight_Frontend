import React, { Component } from 'react';
import Events from '../components/Events'

export class EventsContainer extends Component {

    state = {
        events: [],
        token: localStorage.token
    }

    componentDidMount = () => {
        fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/events`)
        .then(res => res.json())
        .then(eventsData => {
            let events =  eventsData.sort(
                (a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()))
                
            console.log(eventsData)
            this.setState({
                events: eventsData
            })
        })
    }

    mount =() => {
        this.componentDidMount()
    }

    render() {
        let eventList = this.state.events.length > 0 ? (
            this.state.events.map(event => { return (<Events event={event} mount={this.mount}/>)}))
            : 
            (<h4 style={{"margin-top": "40px"}}>You don't have any events right now. Get to it!</h4>)

        return (
            <div>
                <h1 style={{"font-family":"Emilys Candy"}}>Events</h1>
                {eventList}
            </div>
        )
    }
}

export default EventsContainer
