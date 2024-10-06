import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericStatChartComponent } from './generic-stat-chart.component';

describe('GenericStatChartComponent', () => {
  let component: GenericStatChartComponent;
  let fixture: ComponentFixture<GenericStatChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericStatChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericStatChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
