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

  public theme = false;

  constructor() { }

  getTheme() {
    if (this.theme === false) {
      return 'BRIGHT';
    } else if (this.theme === true) {
      return 'DARK';
    }
  }

  changeTheme(theme: string) {
    if (theme === 'BRIGHT') {
      this.theme = false;
    } else if (theme === 'DARK') {
      this.theme = true;
    }
  }

}
