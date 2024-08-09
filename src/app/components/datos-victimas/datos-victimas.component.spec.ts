import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosVictimasComponent } from './datos-victimas.component';

describe('DatosVictimasComponent', () => {
  let component: DatosVictimasComponent;
  let fixture: ComponentFixture<DatosVictimasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosVictimasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosVictimasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
