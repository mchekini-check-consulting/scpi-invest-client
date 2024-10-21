import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScpiPerformanceSimulationComponent } from './scpi-performance-simulation.component';

describe('ScpiPerformanceSimulationComponent', () => {
  let component: ScpiPerformanceSimulationComponent;
  let fixture: ComponentFixture<ScpiPerformanceSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScpiPerformanceSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScpiPerformanceSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
