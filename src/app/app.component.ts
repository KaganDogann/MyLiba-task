import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-liba';
  lang:string
  /**
   *
   */
  constructor(private translate: TranslateService,) {
    translate.setDefaultLang("en");
    translate.use("en");
  }

  changeLang(lang:string){
    console.log(lang)
    localStorage.clear();
    localStorage.setItem("lang",lang);
    this.translate.use(lang);

  }
}
