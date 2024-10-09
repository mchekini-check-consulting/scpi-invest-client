import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScpiSimulationComponent } from './scpi-simulation.component';

describe('ScpiSimulationComponent', () => {
  let component: ScpiSimulationComponent;
  let fixture: ComponentFixture<ScpiSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScpiSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScpiSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
