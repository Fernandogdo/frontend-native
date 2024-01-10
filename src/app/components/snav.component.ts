import { Component, OnInit } from '@angular/core';

interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
}


@Component({
    selector: 'app-snav',
    templateUrl: './snav.component.html',
    //   styleUrls: ['./snav.component.css']
})
export class SnavComponent implements OnInit {
    title = 'Native Ec';

    isSideNavCollapsed = false
    screenWidth = 0;

    onToggleSideNav(data: SideNavToggle): void {
        this.screenWidth = data.screenWidth;
        this.isSideNavCollapsed = data.collapsed;
    }


    ngOnInit(): void {
    }
}



// import { Component } from '@angular/core';

// interface SideNavToggle {
//     screenWidth: number;
//     collapsed: boolean;
// }

// @Component({
//     selector: 'app-root',
//     templateUrl: './app.component.html',
//     styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//     title = 'frontendnative';

//     isSideNavCollapsed = false
//     screenWidth = 0;

//     onToggleSideNav(data: SideNavToggle): void {
//         this.screenWidth = data.screenWidth;
//         this.isSideNavCollapsed = data.collapsed;
//     }
// }