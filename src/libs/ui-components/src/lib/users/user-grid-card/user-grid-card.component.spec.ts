import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGridCardComponent } from './user-grid-card.component';

describe('UserGridCardComponent', () => {
  let component: UserGridCardComponent;
  let fixture: ComponentFixture<UserGridCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGridCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
