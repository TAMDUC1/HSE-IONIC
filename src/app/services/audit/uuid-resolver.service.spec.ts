import { TestBed } from '@angular/core/testing';

import { UuidResolverService } from './uuid-resolver.service';

describe('UuidResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UuidResolverService = TestBed.get(UuidResolverService);
    expect(service).toBeTruthy();
  });
});
