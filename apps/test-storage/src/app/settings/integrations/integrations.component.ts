import { Component, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css'],
  animations: [pageTransition]
})
export class IntegrationsComponent {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

}
