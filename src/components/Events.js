import React, { Component } from 'react';
import {Card, Button, Form} from 'semantic-ui-react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import TimePicker from 'react-time-picker';


export class Events extends Component {

    state = {
        date: new Date(),
        time: "", 
        visible: true,
        modalIsOPen: false
    }

    toggleAlert() {
        this.setState({
            visible: !this.state.visible
        })
    }

    toggleModal() {
        this.setState({
            modalIsOPen: !this.state.modalIsOPen
        })
    }

    deleteEvent = () => {
        console.log("delete");
        fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/events/${this.props.event.id}`, {
            method: "DELETE",
        })
        .then(r => {
            this.props.mount()
        })
    }

    // updateEvent = (event) => {
    //     console.log("up")
    //         event.preventDefault
    //     fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/events/${this.props.event.id}`), {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json", 
    //             "Authorization": localStorage.token
    //           },
    //           body: JSON.stringify({
    //             updateddate: this.state.date,
    //             updatedtime: this.state.time
    //           })
    //           .then(res => res.json())
    //           .then(data => {
    //             this.setState({
    //                 date: data.updateddate,
    //                 time: data.updatedtime
    //           })
    //         })
    //     }}
    
      

// handleChange = event => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   }

    onChange = time => this.setState({ time })
//   handleSubmit = event => {
//       console.log(event)
//     event.preventDefault();
//     this.setState(
//       {
//         date: this.state.date,
//         time: this.state.time
//       })
//     }

    render() {

        let eventTime = this.props.event.time ? (
             this.props.event.time)
            : 
            null

        let eventDate = this.props.event.date ? (
            this.props.event.date)
           : 
           null     
        
        return (
                <div style={{"margin-top":"20px"}}>
               <ul className="events-list">
                <li>
               {this.props.event.content} <br/>
               {this.props.event.location} <br/>
               {eventDate} {eventTime}
               <button className="delete-event" data-id={`${this.props.event.id}`}
               onClick={this.deleteEvent} 
               >❌ Delete </button>
               <button className="update-event" data-id={`${this.props.event.id}`}
               onClick={this.toggleModal.bind(this)}
               >🖊 Update </button>
               </li>
               </ul>

    <Modal isOpen={this.state.modalIsOPen}>
    <ModalHeader toggle={this.toggleModal.bind(this)}>Enter Date and Time for this Event</ModalHeader>
    <ModalBody>
        {/* <Form onSubmit={(e) => this.updateEvent(e)}> */}
                    
                      <DateTimePicker
                      onChange={this.onChange}
                      value={this.state.date}
                    />
                        // fluid
                        // label="Date"
                        // name="date"
                        // value={this.state.date}
                        // onChange={this.onChange}
                    />
                    <TimePicker
                        // fluid
                        // label="Time"
                        // name="date"
                        value={this.state.time}
                        onChange={this.onChange}
                    />
                    {/* <Form.Field control={Button}>Submit</Form.Field> */}
                {/* <Button id="submit-button" style={{"font-family":"Emilys Candy", "border-radius": "50px"}}>Submit</Button> */}
                {/* </Form> */}
    </ModalBody>
    <ModalFooter>
    </ModalFooter>
    </Modal>
    
            </div>
           
        )
    }
}

export default Events
