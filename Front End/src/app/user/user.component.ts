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
  CalendarIsShow = false;
  EventsIsShow = false;
  CommitteesIsShow = true;
  NewEventIsShow = false;
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ,18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  years = [2020, 2021, 2022, 2023];
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.getEvents();
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
    console.log(this.ProfileIsShow);
  }
  openCalendar(){
    this.CalendarIsShow = true;
    this.EventsIsShow = false
    this.CommitteesIsShow = false
  }
  openEvents(){
    this.EventsIsShow = true;
    this.CalendarIsShow = false
    this.CommitteesIsShow = false
  }
  openCommittees(){
    this.CommitteesIsShow = true;
    this.EventsIsShow = false
    this.CalendarIsShow = false
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
}
