import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  isUser = false;
  userid = Number(sessionStorage.getItem('userid'));
  username = sessionStorage.getItem('username');
  useremail = sessionStorage.getItem('useremail');
  userpassword = sessionStorage.getItem('userpassword');
  usertype = sessionStorage.getItem('usertype');
  eventsData = [];
  followingData;
  committeesData;
  profileData;
  displayEventsData;
  curdatetime = new Date();
  startIndex = Number(sessionStorage.getItem('startIndex'));
  endIndex = Number(sessionStorage.getItem('endIndex'));
  ProfileIsShow = false;
  TimelineIsShow = true;
  CommitteesIsShow = false;
  //NewEventIsShow = false;
  EditProfile = false;
  tempCommittees = this.CommitteesIsShow;
  tempTimeline = this.TimelineIsShow;
  CurrentDate = new Date();
  constructor(private dataService: DataService, private router: Router, private activated_router: ActivatedRoute, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.getCommittees();
    this.getProfile();
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
  getProfile(){
    console.log(this.document.referrer);
    if (this.document.referrer == "http://localhost:8000/" || this.document.referrer == "http://localhost:8000/login" || this.document.referrer == "http://localhost:8000/register") {
      console.log("Hello");
      this.userid = Number(this.activated_router.snapshot.paramMap.get('id'));
      sessionStorage.setItem('userid', this.userid.toString());
      console.log(Number(sessionStorage.getItem('userid')));
      this.username = this.activated_router.snapshot.paramMap.get('name').replace("+"," ");  
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
      //   this.router.navigate(['/user']);
      // });
      this.document.location.href = "http://localhost:4200/user";
    }    
    
    if (this.username != null && this.userpassword != null) {
      if (this.usertype == "web") {
        console.log(Number(sessionStorage.getItem('userid')), sessionStorage.getItem('username'), sessionStorage.getItem('useremail'), sessionStorage.getItem('userpassword'), sessionStorage.getItem('usertype'));
        this.isUser = true;
        this.getEvents();
      } else if (this.usertype == "committee") {
        this.router.navigateByUrl('/organiser');
      }
    } else {
      window.alert('Please login first');
      this.document.location.href = "http://localhost:8000";
    }
  }
  getEvents() {
    this.dataService.fetchFollowingEvents(this.userid).subscribe( res => {
      console.log("Following Data Fetched: ", res);
      this.followingData = res;
      console.log(this.followingData);
    });

    this.dataService.fetchEvents().subscribe( res =>{
      console.log("Events Data Fetched: ", res);
      var tempEventsData = res['data'];
      for (const i in this.followingData) {
        var element = this.followingData[i];
        console.log(element);
        this.committeesData[element.committee_id - 1].following = true;
        tempEventsData.forEach(tempEvent => {
          if (tempEvent.committee_id == element.committee_id) {
            this.eventsData.push(tempEvent);  
          }
        });  
      }
      console.log(this.committeesData);
      // this.eventsData = res['data'];
      this.eventsData.forEach(element => {
        element.from = new Date(element.from);
        element.to = new Date(element.to);
        element.detailsToggle = false;
      });
      this.eventsData.sort(this.compareDates);
      this.displayCurrentEvents();    
    });
  }
  getCommittees() {
    this.dataService.fetchCommittees().subscribe( res => {
      this.committeesData = res;
      this.committeesData.forEach(element => {
        element.following = false;  
      });
      console.log(this.committeesData);
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
    document.getElementById('timeline').style.backgroundColor = "rgba(4, 110, 184, 0.5)";
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
    //   this.router.navigate(['/user']);
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
    //   this.router.navigate(['/user']);
    // });
  }
  registerCommittee(committee_id: number) {
    this.dataService.followCommittee(this.userid, committee_id).subscribe( res => {
      console.log("Hello");
      this.document.location.href="http://localhost:4200/user";
    });
  }
  registerEvent(event_id: number) {
    this.dataService.registerEvent(this.userid, event_id).subscribe( 
      (res:any) => {
      console.log("Bye");
      window.alert("You have successfully registered for this event");
      // this.document.location.href="http://localhost:4200/user";
      }, 
      (error: any) => {
        console.log("You have already registered for this event!");
        window.alert("You have already registered for this event!");
      }
    );
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
