import { TestBed } from '@angular/core/testing';

import { FilesResolverService } from './files-resolver.service';

describe('FilesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilesResolverService = TestBed.get(FilesResolverService);
    expect(service).toBeTruthy();
  });
});
