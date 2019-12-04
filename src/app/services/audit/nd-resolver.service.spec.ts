import { TestBed } from '@angular/core/testing';

import { NdResolverService } from './nd-resolver.service';

describe('NdResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NdResolverService = TestBed.get(NdResolverService);
    expect(service).toBeTruthy();
  });
});
