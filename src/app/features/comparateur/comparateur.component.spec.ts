import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparateurComponent } from './comparateur.component';

describe('ComparateurComponent', () => {
  let component: ComparateurComponent;
  let fixture: ComponentFixture<ComparateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
