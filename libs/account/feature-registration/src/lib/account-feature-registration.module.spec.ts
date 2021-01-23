import { TestBed, waitForAsync } from '@angular/core/testing';
import { AccountFeatureRegistrationModule } from './account-feature-registration.module';

describe('AccountFeatureRegistrationModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AccountFeatureRegistrationModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountFeatureRegistrationModule).toBeDefined();
  });
});
