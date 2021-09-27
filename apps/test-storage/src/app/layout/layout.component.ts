import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  public toastNotificationsOptions = {
    timeOut: 5000,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 30
  };

}
