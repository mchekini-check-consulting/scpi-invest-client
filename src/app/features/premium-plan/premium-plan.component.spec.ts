import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumPlanComponent } from './premium-plan.component';

describe('PremiumPlanComponent', () => {
  let component: PremiumPlanComponent;
  let fixture: ComponentFixture<PremiumPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
