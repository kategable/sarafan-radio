import { TestBed, waitForAsync } from '@angular/core/testing';
import { AccountDomainModule } from './account-domain.module';

describe('AccountDomainModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AccountDomainModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountDomainModule).toBeDefined();
  });
});
