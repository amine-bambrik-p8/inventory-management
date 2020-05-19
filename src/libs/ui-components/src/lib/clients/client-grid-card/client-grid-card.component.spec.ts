import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGridCardComponent } from './client-grid-card.component';

describe('ClientGridCardComponent', () => {
  let component: ClientGridCardComponent;
  let fixture: ComponentFixture<ClientGridCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientGridCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
