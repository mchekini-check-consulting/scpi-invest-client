import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {PremiumPlanService} from "../../core/service/premium-plan.service";
import {PremiumPlanModel} from "../../core/model/premium-plan-model";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-premium-plan',
  standalone: true,
  imports: [
    TableModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './premium-plan.component.html',
  styleUrl: './premium-plan.component.css'
})
export class PremiumPlanComponent implements OnInit {

  constructor(private premiumPlanService: PremiumPlanService) {}

  fonctionality!: PremiumPlanModel [];
  selectedPlan!: String;

  ngOnInit(): void {
    this.premiumPlanService.getPlans().subscribe(data => {
      this.fonctionality = data;
      console.log(data)
    })
  }

  onChangePlan(plan: String) {
    this.selectedPlan = plan;
    this.premiumPlanService.sendPlan(plan).subscribe(data => {
      console.log("success send to api");
    });
  }
}
