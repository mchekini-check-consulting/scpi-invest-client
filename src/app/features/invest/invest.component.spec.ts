import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestComponent } from './invest.component';

describe('InvestComponent', () => {
  let component: InvestComponent;
  let fixture: ComponentFixture<InvestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
