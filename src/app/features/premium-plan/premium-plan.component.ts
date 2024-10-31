import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {PremiumPlanService} from "../../core/service/premium-plan.service";
import {PremiumPlanModel} from "../../core/model/premium-plan-model";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../core/service/user.service";

@Component({
  selector: 'app-premium-plan',
  standalone: true,
  imports: [
    TableModule,
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './premium-plan.component.html',
  styleUrl: './premium-plan.component.css'
})
export class PremiumPlanComponent implements OnInit {

  constructor(private premiumPlanService: PremiumPlanService,private user:UserService) {}

  fonctionality!: PremiumPlanModel [];
  isPremium: boolean = false;

  ngOnInit(): void {
    this.premiumPlanService.getPlans().subscribe(data => {
      this.fonctionality = data;
      console.log(data)
    })

   this.isPremium=  this.user.getUser()?.role === "ROLE_PREMIUM";
  }

  onChangePlan(plan: String) {
    this.premiumPlanService.sendPlan(plan).subscribe(data => {
      console.log("success send to api");
    });
  }

}
