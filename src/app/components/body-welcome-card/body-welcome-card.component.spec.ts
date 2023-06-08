import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyWelcomeCardComponent } from './body-welcome-card.component';

describe('BodyWelcomeCardComponent', () => {
  let component: BodyWelcomeCardComponent;
  let fixture: ComponentFixture<BodyWelcomeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyWelcomeCardComponent]
    });
    fixture = TestBed.createComponent(BodyWelcomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
