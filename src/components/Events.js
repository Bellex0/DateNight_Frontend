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
        fetch(`https://datenight-api.herokuapp.com/user/${localStorage.loggedInUserId}/events/${this.props.event.id}`, {
            method: "DELETE",
        })
        .then(r => {
            this.props.delete(this.props.event.id)
        })
    }

    updateEvent = (event) => {
        console.log("up")
        fetch(`https://datenight-api.herokuapp.com/user/${localStorage.loggedInUserId}/events/${this.props.event.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json", 
                "Authorization": localStorage.token
              },
              body: JSON.stringify({
                date: this.state.date,
                time: this.state.time,
                
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

                <div style={{"width": "30%", "borderStyle":"solid", "margin": "20px", "display": "flex", 
                "flexDirection": "row", "justifyContent": "center", "text-align": "center", "margin-left":"60px", "background-color":"#ecd6ce"}}>
               <ul style={{"display":"block"}} className="events-list" >
                <li className="event-list-item" id="normal" style={{"font-size":"24px"}}>
               <h7 style={{"font-weight":"bold"}}>{this.props.event.content}</h7> <br/>
               {this.props.event.location} <br/>
               {eventDate} {eventTime}
               <button className="delete-button" style={{"font-size":"16px", "margin-left": "10px", "border-radius": "20px", "padding":"4px", "background-color":"#dfddda" }} data-id={`${this.props.event.id}`}
               onClick={this.props.delete} 
               >❌ Delete </button>
               <button style={{"font-size":"16px", "margin-left": "10px", "border-radius": "20px", "padding":"4px"}} className="update-button" data-id={`${this.props.event.id}`}
               onClick={this.toggleModal.bind(this)}
               >🖊 Update </button>
               </li>
               </ul>

    <Modal isOpen={this.state.modalIsOPen}>
    <ModalHeader toggle={this.toggleModal.bind(this)}>Enter Date and Time for this Event</ModalHeader>
    <ModalBody>
       
                    <div style={{"display":"inline-flex", "margin-right":"20px"}}>
                      <DatePicker
                      placeholderText="Date"
                      dateFormat="MM-dd-yyyy"
                      onChange={this.handleChange}
                      selected={this.state.date}
                      isClearable={true}
                    />
                    </div>

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
