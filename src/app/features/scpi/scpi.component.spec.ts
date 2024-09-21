import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScpiComponent } from './scpi.component';

describe('ScpiComponent', () => {
  let component: ScpiComponent;
  let fixture: ComponentFixture<ScpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
