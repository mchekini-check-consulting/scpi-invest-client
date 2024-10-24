import {Routes} from '@angular/router';
import {TemplateComponent} from "./core/template/container/template.component";
import {ScpiComponent} from "./features/scpi/scpi.component";
import {InvestComponent} from "./features/invest/invest.component";
import {ScpiDetailComponent} from "./features/scpi/components/scpi-detail/scpi-detail.component";
import {SimulationComponent} from "./features/simulation/simulation.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {PlannedInvestmentComponent} from "./features/planned-investment/planned-investment.component";

export const routes: Routes = [

  {
    path: '', component: TemplateComponent, children: [
      {path: '', component: ScpiComponent},
      {path: 'scpi', component: ScpiComponent, canActivate: [AuthGuard]},
      {path: 'scpi/:id', component: ScpiDetailComponent, canActivate: [AuthGuard]},
      {path: 'invest', component: InvestComponent, canActivate: [AuthGuard]},
      {path: 'simulation', component: SimulationComponent, canActivate: [AuthGuard]},
      {path: 'versement', component: PlannedInvestmentComponent, canActivate: [AuthGuard]},
      {path: '**', component: ScpiComponent, canActivate: [AuthGuard] }
    ]
  }

];
