import { Component, OnInit } from '@angular/core';
import { ThemeService } from './../../../services/theme/theme.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(public themeService: ThemeService) { }

  ngOnInit() {
  }

}
