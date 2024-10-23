import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersementComponent } from './versement.component';

describe('VersementComponent', () => {
  let component: VersementComponent;
  let fixture: ComponentFixture<VersementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
