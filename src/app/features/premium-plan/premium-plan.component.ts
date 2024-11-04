import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {PremiumPlanService} from "../../core/service/premium-plan.service";
import {PremiumPlanModel} from "../../core/model/premium-plan-model";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../core/service/user.service";
import {AuthService} from "../../core/service/auth.service";
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'app-premium-plan',
  standalone: true,
  imports: [
    TableModule,
    NgIf,
    NgForOf,
    NgClass,
    DialogModule
  ],
  templateUrl: './premium-plan.component.html',
  styleUrl: './premium-plan.component.css'
})
export class PremiumPlanComponent implements OnInit {

  constructor(private premiumPlanService: PremiumPlanService,private user:UserService,
              private authService: AuthService) {}

  fonctionality!: PremiumPlanModel [];
  isPremium: boolean = false;
  showConfirmationPopup: boolean = false;
  countdown: number = 5;

  subscribe() {

    this.showConfirmationPopup = true;
    this.startCountdown();
  }

  startCountdown() {
    const interval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(interval);
        this.authService.logout();
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.premiumPlanService.getPlans().subscribe(data => {
      this.fonctionality = data;
    })

   this.isPremium=  this.user.getUser()?.role === "ROLE_PREMIUM";
  }

  onChangePlan(plan: String) {
    this.premiumPlanService.sendPlan(plan).subscribe(data => {
      this.subscribe();
    });
  }

}
