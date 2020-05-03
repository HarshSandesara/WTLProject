import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  isOrganiser=true; // hardcoded
  eventsData;
  committee_id=6; // Hardcoded
  name='Harsh Sandesara';
  ProfileIsShow = false;
  TimelineIsShow = true;
  CommitteesIsShow = false;
  //NewEventIsShow = false;
  EditProfile = false;
  tempCommittees = this.CommitteesIsShow;
  tempTimeline = this.TimelineIsShow;
  CurrentDate = new Date();
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.getEvents();
    document.getElementById('timeline').style.backgroundColor = "rgba(4, 110, 184, 0.5)";
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
  openProfile(){
    this.ProfileIsShow = !this.ProfileIsShow;
  }
  // openCalendar(){
  //   this.TimelineIsShow = false;
  //   this.CommitteesIsShow = false;
  // }
  openTimeline(){
    this.EditProfile = false;
    this.TimelineIsShow = true;
    this.CommitteesIsShow = false;
    document.getElementById('timeline').style.backgroundColor = "rgba(4, 110, 184, 0.5)";
    document.getElementById('committees').style.backgroundColor = "rgba(4, 110, 184, 0)";
    this.ProfileIsShow = false;
    this.EditProfile = false;
  }
  openCommittees(){
    this.EditProfile = false;
    this.CommitteesIsShow = true;
    this.TimelineIsShow = false;
    document.getElementById('timeline').style.backgroundColor = "rgba(4, 110, 184, 0)";
    document.getElementById('committees').style.backgroundColor = "rgba(4, 110, 184, 0.5)";
    this.ProfileIsShow = false;
    this.EditProfile = false;
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
