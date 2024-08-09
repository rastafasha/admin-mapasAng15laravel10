import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolacionesDdhhComponent } from './violaciones-ddhh.component';

describe('ViolacionesDdhhComponent', () => {
  let component: ViolacionesDdhhComponent;
  let fixture: ComponentFixture<ViolacionesDdhhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolacionesDdhhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolacionesDdhhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
