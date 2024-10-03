import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scpi_itemComponent } from './scpi_item.component';

describe('ScpiComponent', () => {
  let component: Scpi_itemComponent;
  let fixture: ComponentFixture<Scpi_itemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scpi_itemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scpi_itemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
