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

  setTheme(theme: string) {
    if (theme === 'BRIGHT') {
      this.theme = false;
    } else if (theme === 'DARK') {
      this.theme = true;
    }

    console.log(theme);
  }

}
