import { async, TestBed } from '@angular/core/testing';
import { UiComponentsModule } from './ui-components.module';

describe('UiComponentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiComponentsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiComponentsModule).toBeDefined();
  });
});
