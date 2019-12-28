import React, { Component } from 'react';
import Events from '../components/Events'

export class EventsContainer extends Component {

    state = {
        events: [],
        token: localStorage.token
    }

    componentDidMount = () => {
        fetch(`https://datenight-api.herokuapp.com/user/${localStorage.loggedInUserId}/events`)
        .then(res => res.json())
        .then(eventsData => {
           
            // if (eventsData.includes(event.date !== null))

            // let eventDates= eventsData.filter(event => event.date !== null)
            let events = eventsData.sort(
                (a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()))
                
            console.log(eventsData)
            this.setState({
                events: events
            })
        })
    }


    mount =() => {
        this.componentDidMount()
    }

    updateTimeDate = (newEvent) => {
       const updatedArray = this.state.events.map(event => {
           if (event.id === newEvent.id){
               event.time = newEvent.time
               event.date = newEvent.date
               return event
           } 
           return event
        })
        // console.log(updatedArray)
        this.setState({
            events: updatedArray
        })
    }

    deleteEvent = (e) => {
        console.log(e.target.dataset.id)
        const goodArray = this.state.events.filter(event => event.id !== parseInt(e.target.dataset.id))
        this.setState({
            events:goodArray
        })
    }


    render() {
        let eventList = this.state.events.length > 0 ? (
            this.state.events.map(event => { return (<Events event={event} mount={this.mount} updateDate={this.updateTimeDate} delete={this.deleteEvent}/>)}))
            : 
            (<h4 style={{"color":"#f1e3f1", "margin-top": "40px"}}>You don't have any events right now. Get to it!</h4>)

        return (
            <div>
                <h1 style={{"color":"#f1e3f1", "font-family":"Emilys Candy", "font-size":"40px"}}><b>Events</b></h1>
                <div style={{"display": "flex", "flexDirection": "row", textAlign:"center"}}></div>
                {eventList}
            </div>
        )
    }
}

export default EventsContainer
