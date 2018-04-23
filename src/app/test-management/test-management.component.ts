import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-test-management',
  templateUrl: './test-management.component.html',
  styleUrls: ['./test-management.component.css'],
  animations: [pageTransition]
})
export class TestManagementComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  public testcases = [
    {
      name: 'Импорт валидных геозон из файла'
    },
    {
      name: 'Экспорт валидных геозон'
    },
    {
      name: 'Валидация геозон'
    },
    {
      name: 'Удаление геозон'
    }

  ];

  testSuitesTree: any[] = [
    {
      name: 'Main Features',
      icon: 'folder',
      expanded: true,
      children: [
        {
          icon: 'folder',
          name: 'Authentication',
          active: false
        },
        {
          icon: 'folder',
          name: 'Messaging',
          active: false
        },
        {
          icon: 'folder',
          name: 'Dashboard',
          active: false
        },
        {
          icon: 'folder',
          name: 'Maps',
          active: true
        }
      ]
    },
    {
      name: 'REST API',
      icon: 'folder',
      expanded: false,
      children: [
        {
          icon: 'folder',
          name: 'Authentication',
          active: false
        }
      ]
    },
    {
      name: 'Non-functional',
      icon: 'folder',
      expanded: false,
      children: [
        {
          icon: 'folder',
          name: 'Messaging',
          active: false
        }
      ]
    }
  ];

  openTestSuite(testSuiteName: string, child: string) {

  }

  constructor(protected translateService: TranslateService) { }

  ngOnInit() {
  }

}
