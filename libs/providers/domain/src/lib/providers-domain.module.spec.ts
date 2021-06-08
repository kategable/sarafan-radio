import { TestBed, waitForAsync } from '@angular/core/testing';
import { ProvidersDomainModule } from './providers-domain.module';

describe('ProvidersDomainModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ProvidersDomainModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ProvidersDomainModule).toBeDefined();
  });
});
