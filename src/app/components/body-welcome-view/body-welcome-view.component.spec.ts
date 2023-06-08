import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyWelcomeViewComponent } from './body-welcome-view.component';

describe('BodyWelcomeViewComponent', () => {
  let component: BodyWelcomeViewComponent;
  let fixture: ComponentFixture<BodyWelcomeViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyWelcomeViewComponent]
    });
    fixture = TestBed.createComponent(BodyWelcomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
