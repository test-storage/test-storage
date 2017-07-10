import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../../../animations';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
  providers: [ ThemeService ],
  animations: [pageTransition()]
})
export class CreateProjectComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  constructor(public themeService: ThemeService) { }

  ngOnInit() {
  }

}
