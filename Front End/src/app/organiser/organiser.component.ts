import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Event } from '../shared/Events';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

class EventDetails {
  name: any
  dateFrom: any
  timeFrom: any
  dateTo: any
  timeTo: any
  fees: any
}

@Component({
  selector: 'app-organiser',
  templateUrl: './organiser.component.html',
  styleUrls: ['./organiser.component.css']
})
export class OrganiserComponent implements OnInit {
  isOrganiser=true; // hardcoded
  eventsData;
  newEventData;
  committee_id=6; // Hardcoded
  name='Harsh Sandesara';
  ProfileIsShow = false;
  TimelineIsShow = true;
  CommitteesIsShow = false;
  EditProfile = false;
  tempCommittees = this.CommitteesIsShow;
  tempTimeline = this.TimelineIsShow;
  //NewEventIsShow = false;
  newEventDetails = new EventDetails();
  EventArray = [];
  public event = {
    name: 'Open Mic',
    dateFrom: '2020-03-02',
    timeFrom: '18:30',
    dateTo: '2020-03-02',
    timeTo: '22:00',
    fees: 200
    }
  constructor(private dataService: DataService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.getEvents();
    this.newEventData = new FormGroup({
      newEventName: new FormControl(""),
      newEventStartDate: new FormControl(""),
      newEventEndDate: new FormControl(""),
      newEventStartTime: new FormControl(""),
      newEventEndTime: new FormControl(""),
      newEventPrice: new FormControl("")
    });
    this.newEventDetails = new EventDetails();
    this.EventArray.push(this.newEventDetails);
    document.getElementById('timeline').style.backgroundColor = "rgba(4, 110, 184, 0.5)";
  }
  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.event = this.event;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   console.log(receivedEntry);
    // })
  }
  addNewEvent() {
    //alert(document.getElementById('EventName').value+document.getElementById('EventFees').value+document.getElementById('EventDateFrom').value+document.getElementById('EventTimeFrom').value+document.getElementById('EventDateTo').value+document.getElementById('EventTimeTo').value);
  }
  onSubmit() {
    console.log(this.EventArray);
  }
  compareDates(a, b) {
    const dateA = a.from;
    const dateB = b.from;

    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison;
  }
  getEvents() {
    this.dataService.fetchEvents().subscribe( res =>{
      console.log("Events Data Fetched: ", res);
      this.eventsData = res['data'];
      this.eventsData.sort(this.compareDates);      
    });
  }
  deleteEvent(id: number) {
    this.dataService.deleteEvent(id).subscribe(
      () => {
        console.log(`Event with id = ${id} deleted`);
        this.router.navigateByUrl('/user', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/organiser']);
        }); 
      },
      (err) => console.log(err) 
    );
  }
  addEvent() {
    var data = this.newEventData.value;
    console.log("Hi! New event added!");
    data.name = data.newEventName;
    console.log(data.name);
    data.from = data.newEventStartDate + " " + data.newEventStartTime;
    data.to = data.newEventEndDate + " " + data.newEventEndTime;
    data.price = data.newEventPrice;
    console.log(data.from);
    console.log(data.to);
    console.log(data.price);
    data.committee_id = this.committee_id;
    console.log(data.committee_id);
    delete data.newEventName;
    delete data.newEventStartDate;
    delete data.newEventStartTime;
    delete data.newEventEndDate;
    delete data.newEventEndTime;
    // const newEvent: Event = {
    //   name: data.EventName,
    //   from: new Date(data.newEventStartDate + "T"+ data.newEventStartTime + ":00"),
    //   to: new Date(data.newEventEndDate + "T"+ data.newEventEndTime + ":00"),
    //   price: data.newEventPrice,
    //   committee_id: this.committee_id
    // }
    this.dataService.postEvent(data).subscribe(
      (data: Event) => {
        console.log(data);
        this.router.navigateByUrl('/user', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/organiser']);
        }); 
      },
      (error: any) => console.log(error)
    );
    // console.log(data.newEventDate + "T"+ data.newEventTime + ":00");
    // const newDate: Date = new Date(data.newEventDate + "T"+ data.newEventTime + ":00");
    // console.log(newDate);
  }
  editEvent(id: number) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.event = this.event;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   console.log(receivedEntry);
    // })
  }
  openProfile(){
    this.ProfileIsShow = !this.ProfileIsShow;
    //console.log(this.ProfileIsShow);
  }
  // openCalendar(){
  //   this.TimelineIsShow = false
  //   this.CommitteesIsShow = false
  // }
  openTimeline(){
    this.EditProfile = false;
    this.TimelineIsShow = true;
    this.CommitteesIsShow = false;
    document.getElementById('timeline').style.backgroundColor = "rgba(4, 110, 184, 0.5)";
    document.getElementById('committees').style.backgroundColor = "rgba(4, 110, 184, 0)";
    this.ProfileIsShow = false;
  }
  openCommittees(){
    this.EditProfile = false;
    this.CommitteesIsShow = true;
    this.TimelineIsShow = false;
    document.getElementById('timeline').style.backgroundColor = "rgba(4, 110, 184, 0)";
    document.getElementById('committees').style.backgroundColor = "rgba(4, 110, 184, 0.5)";
    this.ProfileIsShow = false;
  }
  openEditProfile() {
    this.tempCommittees = this.CommitteesIsShow;
    this.tempTimeline = this.TimelineIsShow;
    this.CommitteesIsShow = false;
    this.TimelineIsShow = false;
    this.ProfileIsShow = false;
    this.EditProfile = true;
  }
  openNewEvent(event:any){
    // Create add button
    // var button = document.createElement("input")
    // button.setAttribute("type", "button")
    // button.setAttribute("id", "addbutton")
    // button.setAttribute("value", "+")
    // button.setAttribute("(click)", "addEvent()")
    // button.className = "btn btn-danger"
    // button.style["background"] = "linear-gradient(to left, rgb(78, 2, 2) 0%, rgb(255, 0, 0) 100%)"
    // button.style["border"] = "none"
    // button.style["border-radius"] = "100%"
    // button.style["float"] = "right"

    // Create Div to store elements
    // var element = document.createElement("div")
    // var form = document.createElement("form")
    // form.innerHTML = '<input type="button" id="addbutton" value="+" (click)="addEvent()" class="btn btn-danger" style="background: linear-gradient(to left, rgb(78, 2, 2) 0%, rgb(255, 0, 0) 100%);border: none;border-radius: 100%;float: right;"><div id="newEventNameDiv" class="form-group"><label for="newEventName"><h4>Event Name:</h4></label><input id="newEventName" class="form-control" type="text" style="width: 30%; margin: 0 auto;"></div><div class="form-group"><label for="newEventDate"><h4>Event Date:</h4></label><input id="newEventDate" type="date" class="form-control btn-danger" style="width: 30%; margin: 0 auto;"></div><div class="form-group"><label for="newEventTime"><h4>Event Time:</h4></label><input id="newEventTime" type="time" class="form-control btn-danger" style="width: 30%; margin: 0 auto;"></div><hr>'
    // element.appendChild(form)
    // form.prepend(button)
    // var refNode = document.getElementById("addEvent")
    // var parent = refNode.parentNode
    // parent.insertBefore(element, refNode)
    // document.getElementById('parentdiv').insertBefore(button, element)
  }
  saveChanges() {
    this.EditProfile = false;
    this.CommitteesIsShow = this.tempCommittees;
    this.TimelineIsShow = this.tempTimeline;
  }

  cancelChanges() {
    this.EditProfile = false;
    this.CommitteesIsShow = this.tempCommittees;
    this.TimelineIsShow = this.tempTimeline;
  }
}
