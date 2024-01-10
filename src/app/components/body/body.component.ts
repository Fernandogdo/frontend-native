import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';




@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0;


  constructor(
    private usersService:UsersService,
  ) { }

  ngOnInit(): void {
  }

  getBodyClass():string{
    let styleClass = ''
    if (this.collapsed && this.screenWidth > 768 ) {
      styleClass = 'body-trimmed' 
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-md-screen'
    }
    return styleClass
  }



  logOut(){
    this.usersService.logOut()
  }

}
