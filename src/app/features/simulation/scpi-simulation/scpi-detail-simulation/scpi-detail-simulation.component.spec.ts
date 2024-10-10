import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScpiDetailSimulationComponent } from './scpi-detail-simulation.component';

describe('ScpiDetailSimulationComponent', () => {
  let component: ScpiDetailSimulationComponent;
  let fixture: ComponentFixture<ScpiDetailSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScpiDetailSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScpiDetailSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
