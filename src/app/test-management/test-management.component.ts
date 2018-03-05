import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-management',
  templateUrl: './test-management.component.html',
  styleUrls: ['./test-management.component.css']
})
export class TestManagementComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
