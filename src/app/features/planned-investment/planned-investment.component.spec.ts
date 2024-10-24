import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedInvestmentComponent } from './planned-investment.component';

describe('VersementComponent', () => {
  let component: PlannedInvestmentComponent;
  let fixture: ComponentFixture<PlannedInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannedInvestmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannedInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
