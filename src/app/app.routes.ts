import {Routes} from '@angular/router';
import {TemplateComponent} from "./core/template/container/template.component";
import {ScpiComponent} from "./features/scpi/scpi.component";
import {InvestComponent} from "./features/invest/invest.component";

export const routes: Routes = [

  {
    path: '', component: TemplateComponent, children: [
      {path: 'scpi', component: ScpiComponent},
      {path: 'invest', component: InvestComponent}
    ]
  }

];
