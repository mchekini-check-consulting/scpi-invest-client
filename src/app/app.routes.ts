import {Routes} from '@angular/router';
import {TemplateComponent} from "./core/template/container/template.component";
import {ScpiComponent} from "./features/scpi/scpi.component";
import {InvestComponent} from "./features/invest/invest.component";
import {ScpiDetailComponent} from "./features/scpi/components/scpi-detail/scpi-detail.component";
import {SimulationComponent} from "./features/simulation/simulation.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {PlannedInvestmentComponent} from "./features/planned-investment/planned-investment.component";
import {ComparateurComponent} from "./features/comparator/comparateur.component";
import {PremiumPlanComponent} from "./features/premium-plan/premium-plan.component";
import {ProfileInformationComponent} from "./features/profile-information/profile-information.component";
import {CreditComponent} from "./features/credit/credit.component";

export const routes: Routes = [

  {
    path: '', component: TemplateComponent, children: [
      {path: '', component: ScpiComponent},
      {path: 'scpi', component: ScpiComponent, canActivate: [AuthGuard]},
      {path: 'scpi/:id', component: ScpiDetailComponent, canActivate: [AuthGuard]},
      {path: 'invest', component: InvestComponent, canActivate: [AuthGuard]},
      {path: 'simulation', component: SimulationComponent, canActivate: [AuthGuard]},
      {path: 'versement', component: PlannedInvestmentComponent, canActivate: [AuthGuard]},
      {path: 'comparateur', component: ComparateurComponent, canActivate: [AuthGuard]},
      {path: 'plans',component: PremiumPlanComponent, canActivate: [AuthGuard]},
      {path: 'profile-information',component: ProfileInformationComponent, canActivate: [AuthGuard]},
      {path: 'credit',component: CreditComponent, canActivate: [AuthGuard]},
      {path: '**', component: ScpiComponent, canActivate: [AuthGuard] }


    ]
  }

];
