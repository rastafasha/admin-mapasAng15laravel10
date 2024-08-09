import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrensaEditComponent } from './prensa-edit.component';

describe('PrensaEditComponent', () => {
  let component: PrensaEditComponent;
  let fixture: ComponentFixture<PrensaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrensaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrensaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
