import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  showChat = false;


  openChat(){
    this.showChat = true;
  }

  closeChat() {
    this.showChat = false;
  }

}
