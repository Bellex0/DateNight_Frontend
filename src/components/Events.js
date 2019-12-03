import React, { Component } from 'react';
import {Card, Button, Form} from 'semantic-ui-react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import TimePicker from 'react-time-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {formatDate, parseDate,} from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';


export class Events extends Component {

    state = {
        date: "",
        // .toLocaleDateString(),
        time: "",
        // .toLocaleTimeString(), 
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
                time: this.state.time
              })
            })
              .then(res => res.json())
              .then(data => {
                  console.log(data)
            //     this.setState({
            //         date: data.date,
            //         time: data.time
            //   })
            
        
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
                    
                      <DatePicker
                      dateFormat="MM-dd-yyyy"
                      onChange={this.handleChange}
                      selected={this.state.date}
                      isClearable={true}
                    />

                    {/* {/* <DayPickerInput
        formatDate={formatDate}
        parseDate={parseDate}
        placeholder={`${formatDate(new Date())}`}
      /> */}
                       
                    
                    <DatePicker
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    selected={this.state.time}
                    onChange={this.timeChange}
                    isClearable={true} 
                    />
                    {/* <Form.Field control={Button}>Submit</Form.Field> */}
                
                {/* </Form> */}
    </ModalBody>
    <ModalFooter>
    <Button onClick={this.updateEvent} id="submit-button" style={{"font-family":"Emilys Candy", "border-radius": "50px"}}>Submit</Button>
    </ModalFooter>
    </Modal>
    
            </div>
           
        )
    }

}
        


export default Events
