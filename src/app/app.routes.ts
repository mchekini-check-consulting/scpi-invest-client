import {Routes} from '@angular/router';
import {TemplateComponent} from "./core/template/container/template.component";
import {ScpiComponent} from "./features/scpi/scpi.component";
import {InvestComponent} from "./features/invest/invest.component";
import {ScpiDetailComponent} from "./features/scpi/components/scpi-detail/scpi-detail.component";
import {SimulationComponent} from "./features/simulation/simulation.component";

export const routes: Routes = [

  {
    path: '', component: TemplateComponent, children: [
      {path: '', component: ScpiComponent},
      {path: 'scpi', component: ScpiComponent},
      {path: 'scpi/:id', component: ScpiDetailComponent },
      {path: 'simulation', component: SimulationComponent}
    ]
  }

];
