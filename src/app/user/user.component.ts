import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name='Harsh Sandesara'
  ProfileIsShow = false
  CalendarIsShow = false
  EventsIsShow = true
  CommitteesIsShow = false
  constructor() { }

  ngOnInit() {
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
}
