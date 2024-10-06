import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatChartComponent } from './stat-chart.component';

describe('StatChartComponent', () => {
  let component: StatChartComponent;
  let fixture: ComponentFixture<StatChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
