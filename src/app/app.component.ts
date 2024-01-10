import { Component, OnInit } from '@angular/core';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'Native Ec';


  isSideNavCollapsed = false
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle ):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}
