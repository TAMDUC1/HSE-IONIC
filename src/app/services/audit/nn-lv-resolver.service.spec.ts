import { TestBed } from '@angular/core/testing';

import { NnLvResolverService } from './nn-lv-resolver.service';

describe('NnLvResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NnLvResolverService = TestBed.get(NnLvResolverService);
    expect(service).toBeTruthy();
  });
});
