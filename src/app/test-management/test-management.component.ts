import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../animations';

@Component({
  selector: 'app-test-management',
  templateUrl: './test-management.component.html',
  styleUrls: ['./test-management.component.css'],
  animations: [pageTransition]
})
export class TestManagementComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  public users = [
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

  rootDirectory: any[] = [
    {
      name: 'Main Features',
      icon: 'folder',
      expanded: true,
      files: [
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
      files: [
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
      files: [
        {
          icon: 'folder',
          name: 'Messaging',
          active: false
        }
      ]
    }
  ];

  openFile(directoryName: string, fileName: string) {

  }

  constructor() { }

  ngOnInit() {
  }

}
