import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableButtonComponent } from './selectable-button.component';

describe('SelectableButtonComponent', () => {
  let component: SelectableButtonComponent;
  let fixture: ComponentFixture<SelectableButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectableButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectableButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
