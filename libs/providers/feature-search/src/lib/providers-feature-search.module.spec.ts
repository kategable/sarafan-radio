import { TestBed, waitForAsync } from '@angular/core/testing';
import { ProvidersFeatureSearchModule } from './providers-feature-search.module';

describe('ProvidersFeatureSearchModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ProvidersFeatureSearchModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ProvidersFeatureSearchModule).toBeDefined();
  });
});
