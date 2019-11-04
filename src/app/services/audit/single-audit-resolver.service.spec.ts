import { TestBed } from '@angular/core/testing';

import { SingleAuditResolverService } from './single-audit-resolver.service';

describe('SingleAuditResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SingleAuditResolverService = TestBed.get(SingleAuditResolverService);
    expect(service).toBeTruthy();
  });
});
