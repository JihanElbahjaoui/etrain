import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangPwdBtnComponent } from './chang-pwd-btn.component';

describe('ChangPwdBtnComponent', () => {
  let component: ChangPwdBtnComponent;
  let fixture: ComponentFixture<ChangPwdBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangPwdBtnComponent]
    });
    fixture = TestBed.createComponent(ChangPwdBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
