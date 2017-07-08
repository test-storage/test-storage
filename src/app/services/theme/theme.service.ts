import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {

  /*
   * Theme styles
   *
   * bright theme: false
   * dark theme: true
   *
   */

  public theme = true;

  constructor() { }

}
