import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBtnAdminComponent } from './add-btn-admin.component';

describe('AddBtnAdminComponent', () => {
  let component: AddBtnAdminComponent;
  let fixture: ComponentFixture<AddBtnAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBtnAdminComponent]
    });
    fixture = TestBed.createComponent(AddBtnAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
