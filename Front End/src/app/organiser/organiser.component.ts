import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Event } from '../shared/Events';
import { DOCUMENT } from '@angular/common';
import { User } from '../shared/User';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-organiser',
  templateUrl: './organiser.component.html',
  styleUrls: ['./organiser.component.css']
})

export class OrganiserComponent implements OnInit {
  isOrganiser = false;
  userid = Number(sessionStorage.getItem('userid'));
  username = sessionStorage.getItem('username');
  useremail = sessionStorage.getItem('useremail');
  userpassword = sessionStorage.getItem('userpassword');
  usertype = sessionStorage.getItem('usertype');
  eventsData;
  profileData;
  displayEventsData;
  newEventData;
  curdatetime = new Date();
  startIndex = Number(sessionStorage.getItem('startIndex'));
  endIndex = Number(sessionStorage.getItem('endIndex'));
  committee_id=6; // Hardcoded
  name='Harsh Sandesara'; // Hardcoded
  ProfileIsShow = false;
  TimelineIsShow = true;
  CommitteesIsShow = false;
  EditProfile = false;
  tempCommittees = this.CommitteesIsShow;
  tempTimeline = this.TimelineIsShow;
  //NewEventIsShow = false;
  constructor(private dataService: DataService, private router: Router, private activated_router: ActivatedRoute,  private modalService: NgbModal, @Inject(DOCUMENT) private document: Document) { }
  public event = {
    name: 'Open Mic',
    dateFrom: '2020-03-02',
    timeFrom: '18:30',
    dateTo: '2020-03-02',
    timeTo: '22:00',
    fees: 200
  }

  ngOnInit() {
    this.getProfile();
    this.newEventData = new FormGroup({
      newEventName: new FormControl(""),
      newEventStartDate: new FormControl(""),
      newEventEndDate: new FormControl(""),
      newEventStartTime: new FormControl(""),
      newEventEndTime: new FormControl(""),
      newEventPrice: new FormControl("")
    });
    // document.getElementById('timeline').style.backgroundColor = "rgba(4, 110, 184, 0.5)";
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
  getProfile() {
    console.log(this.document.referrer);
    if (this.document.referrer == "http://localhost:8000/" || this.document.referrer == "http://localhost:8000/login/committee") {
      console.log("Hello");
      this.userid = Number(this.activated_router.snapshot.paramMap.get('id'));
      sessionStorage.setItem('userid', this.userid.toString());
      console.log(Number(sessionStorage.getItem('userid')));
      this.username = this.activated_router.snapshot.paramMap.get('name');
      sessionStorage.setItem('username', this.username);
      this.useremail = this.activated_router.snapshot.paramMap.get('email');
      sessionStorage.setItem('useremail', this.useremail);
      this.userpassword = this.activated_router.snapshot.paramMap.get('password');
      sessionStorage.setItem('userpassword', this.userpassword);
      this.usertype = this.activated_router.snapshot.paramMap.get('type');
      sessionStorage.setItem('usertype', this.usertype);
      console.log(this.userid, this.username, this.useremail, this.userpassword, this.usertype);
      console.log(Number(sessionStorage.getItem('userid')), sessionStorage.getItem('username'), sessionStorage.getItem('useremail'), sessionStorage.getItem('userpassword'), sessionStorage.getItem('usertype'));
      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['/organiser']);
      // });
      this.document.location.href = "http://localhost:4200/organiser";
    }    
    
    if (this.username != null && this.userpassword != null) {
      if (this.usertype == "committee") {
        console.log(Number(sessionStorage.getItem('userid')), sessionStorage.getItem('username'), sessionStorage.getItem('useremail'), sessionStorage.getItem('userpassword'), sessionStorage.getItem('usertype'));
        this.isOrganiser = true;
        this.getEvents();
      } else if (this.usertype == "web") {
        this.router.navigateByUrl('/user');
      }
    } else {
      window.alert('Please login first');
      this.document.location.href = "http://localhost:8000";
    }
  }
  getEvents() {
    this.dataService.fetchEvents().subscribe( res =>{
      console.log("Events Data Fetched: ", res);
      this.eventsData = res['data'];
      this.eventsData.forEach(element => {
        element.from = new Date(element.from);
        element.to = new Date(element.to);
      });
      this.eventsData.sort(this.compareDates); 
      this.displayCurrentEvents();    
    });
  }
  displayCurrentEvents() {
    console.log(sessionStorage.getItem('boolDisplayCurrentItems'));
    if (sessionStorage.getItem('boolDisplayCurrentItems') == null || sessionStorage.getItem('boolDisplayCurrentItems') == 'false') {
      // let curdatetime = new Date(); 
      for (var i = 1; i < this.eventsData.length; i++) {
        if (this.eventsData[i].from > this.curdatetime) {
          this.startIndex = i;
          break;
        }
      }

      if (this.startIndex + 10 <= this.eventsData.length) {
        this.endIndex = this.startIndex + 10;
      } else {
        this.endIndex = this.eventsData.length;
      }
      console.log(this.startIndex);
      console.log(this.endIndex);
      sessionStorage.setItem('startIndex', this.startIndex.toString());
      sessionStorage.setItem('endIndex', this.endIndex.toString());
      sessionStorage.setItem('boolDisplayCurrentItems', 'false');
      console.log(sessionStorage.getItem('startIndex'));
      console.log(sessionStorage.getItem('endIndex'));
      console.log(sessionStorage.getItem('boolDisplayCurrentItems'));
    }
  }
  displayPastEvents() {
    if (this.startIndex - 10 > 0) {
      this.startIndex = this.startIndex - 10;
    } else {
      this.startIndex = 0;
    }
    sessionStorage.setItem('startIndex', this.startIndex.toString());
    sessionStorage.setItem('boolDisplayCurrentItems', 'true');
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/organiser']);
    // });
  }
  
  displayFutureEvents() {
    if (this.endIndex + 10 < this.eventsData.length) {
      this.endIndex = this.endIndex + 10;
    } else {
      this.endIndex = this.eventsData.length;
    }
    sessionStorage.setItem('endIndex', this.endIndex.toString());
    sessionStorage.setItem('boolDisplayCurrentItems', 'true');
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/organiser']);
    // });
  }
  deleteEvent(id: number) {
    this.dataService.deleteEvent(id).subscribe(
      () => {
        console.log(`Event with id = ${id} deleted`);
        // this.router.navigateByUrl('/user', { skipLocationChange: true }).then(() => {
        //   this.router.navigate(['/organiser']);
        // });
        this.document.location.href = "http://localhost:4200/organiser" 
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
    
    this.dataService.postEvent(data).subscribe(
      (data: Event) => {
        console.log(data);
        // this.router.navigateByUrl('/user', { skipLocationChange: true }).then(() => {
        //   this.router.navigate(['/organiser']);
        // });
        this.document.location.href = "http://localhost:4200/organiser" 
      },
      (error: any) => console.log(error)
    );
    
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

  logoutUser() {
    // this.dataService.logoutUser().subscribe(
    //   () => {
    //     this.document.location.href = "http://localhost:8000/";
    //   },
    //   (error: any) => console.log(error)
    // );
    sessionStorage.clear();
    this.document.location.href = "http://localhost:8000/logoutMiddle";
  }
}
// const newEvent: Event = {
    //   name: data.EventName,
    //   from: new Date(data.newEventStartDate + "T"+ data.newEventStartTime + ":00"),
    //   to: new Date(data.newEventEndDate + "T"+ data.newEventEndTime + ":00"),
    //   price: data.newEventPrice,
    //   committee_id: this.committee_id
    // }
// console.log(data.newEventDate + "T"+ data.newEventTime + ":00");
    // const newDate: Date = new Date(data.newEventDate + "T"+ data.newEventTime + ":00");
    // console.log(newDate);
// openCalendar(){
  //   this.TimelineIsShow = false
  //   this.CommitteesIsShow = false
  // }
// openNewEvent(event:any){
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
// }
