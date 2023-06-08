import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyWelcomeComponent } from './body-welcome.component';

describe('BodyWelcomeComponent', () => {
  let component: BodyWelcomeComponent;
  let fixture: ComponentFixture<BodyWelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyWelcomeComponent]
    });
    fixture = TestBed.createComponent(BodyWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
