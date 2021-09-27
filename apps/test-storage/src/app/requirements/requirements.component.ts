import { Component, HostBinding } from '@angular/core';
import { pageTransition } from '../animations';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css'],
  animations: [pageTransition]
})
export class RequirementsComponent {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

}
