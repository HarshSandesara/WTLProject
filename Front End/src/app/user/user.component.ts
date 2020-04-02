import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { BuiltinFunctionCall } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isOrganiser=true;
  name='Harsh Sandesara';
  ProfileIsShow = false;
  CalendarIsShow = false;
  EventsIsShow = false;
  CommitteesIsShow = true;
  NewEventIsShow = false;
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ,18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  years = [2020, 2021, 2022, 2023];
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
  openNewEvent(event:any){
    var button = document.createElement("input")
    button.setAttribute("type", "button")
    button.setAttribute("id", "addbutton")
    button.setAttribute("value", "+")
    button.className = "btn btn-danger"
    button.style["background"] = "linear-gradient(to left, rgb(78, 2, 2) 0%, rgb(255, 0, 0) 100%)"
    button.style["border"] = "none"
    button.style["border-radius"] = "50%"
    button.style["float"] = "right"
    var element = document.createElement("div")
    element.innerHTML = '<h4>Event Name:</h4><input class="form-control" type="text" style="width: 30%; margin: 0 auto;"><br><h4>Event Date:</h4><input type="date" class="btn btn-danger"> <input type="time" class="btn btn-danger">'
    var refNode = document.getElementById("addEvent")
    var newcontent = document.createElement('div')
    newcontent.innerHTML = '<hr>'
    element.appendChild(newcontent.firstChild)
    var parent = refNode.parentNode
    parent.insertBefore(element, refNode)
    document.getElementById("parentdiv").insertBefore(button, element)
  }
}
