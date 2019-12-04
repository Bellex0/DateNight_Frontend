import React, { Component } from 'react';
import {Card, Button, Form} from 'semantic-ui-react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


export class Events extends Component {

    state = {
        date: "",
        time: "", 
        visible: true,
        modalIsOPen: false,
        location: ""
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
            this.props.delete(this.props.event.id)
        })
    }

    updateEvent = (event) => {
        console.log("up")
        fetch(`http://localhost:3000/user/${localStorage.loggedInUserId}/events/${this.props.event.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json", 
                "Authorization": localStorage.token
              },
              body: JSON.stringify({
                date: this.state.date,
                time: this.state.time,
                // location: this.state.location
              })
            })
              .then(res => res.json())
              .then(data => {
                  console.log(data)
                this.setState({
                    date: new Date(data.date),
                    time: new Date(data.time),
                    
              })
              this.props.updateDate(data)
              this.toggleModal()
        
        }
        )
    }
    
    timeChange = time => this.setState({ time: time })
    
    
      

// handleChange = (date)  => {
//     this.setState({ [name]: value });
//   }

            handleChange = (date) => {

                this.setState({
                    date: date
                })
            }

            locationChange = (e) => {
                e.stopPropagation()
                console.log(e)
                this.setState({
                    location: e
            })
        }

    // onChange = time => this.setState({ time })
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
            moment(this.props.event.time).format('hh.mm A'))
            : 
            null

        let eventDate = this.props.event.date ? (
            moment(this.props.event.date).format('ddd MM/DD/YY'))
           : 
           null     

         
        
        return (

                <div style={{"margin-top":"20px"}}>
               <ul className="events-list" >
                <li className="event-list-item">
               {this.props.event.content} <br/>
               {this.props.event.location} <br/>
               {eventDate} {eventTime}
               <button className="delete-event" data-id={`${this.props.event.id}`}
               onClick={this.props.delete} 
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
                    <div style={{"display":"inline-flex", "margin-right":"20px"}}>
                      <DatePicker
                      placeholderText="Date"
                      dateFormat="MM-dd-yyyy"
                      onChange={this.handleChange}
                      selected={this.state.date}
                      isClearable={true}
                    />
                    </div>

                    {/* {/* <DayPickerInput
        formatDate={formatDate}
        parseDate={parseDate}
        placeholder={`${formatDate(new Date())}`}
      /> */}
                    <div style={{"display":"inline-flex"}}>
                    <DatePicker
                    placeholderText="Time"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    selected={this.state.time}
                    onChange={this.timeChange}
                    isClearable={true} 
                    />
                    </div>

                   
                        {/* <input
                         placeholder="Location"
                         name="location"
                         value={this.state.location}
                         onChange={this.locationChange}
                        /> */}
                           
                       
                   
                    {/* <Form.Field control={Button}>Submit</Form.Field> */}
                
                {/* </Form> */}
    </ModalBody>
    <ModalFooter>
    <Button onClick={this.updateEvent} id="submit-button" style={{"font-family":"Emilys Candy", "border-radius": "50px",}}>Submit</Button>
    </ModalFooter>
    </Modal>
    
            </div>
           
        )
    }

}
        


export default Events
