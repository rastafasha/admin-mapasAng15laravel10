import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeneLhComponent } from './crimene-lh.component';

describe('CrimeneLhComponent', () => {
  let component: CrimeneLhComponent;
  let fixture: ComponentFixture<CrimeneLhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeneLhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeneLhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
