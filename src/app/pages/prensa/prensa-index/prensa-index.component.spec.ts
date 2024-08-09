import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrensaIndexComponent } from './prensa-index.component';

describe('PrensaIndexComponent', () => {
  let component: PrensaIndexComponent;
  let fixture: ComponentFixture<PrensaIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrensaIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrensaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
