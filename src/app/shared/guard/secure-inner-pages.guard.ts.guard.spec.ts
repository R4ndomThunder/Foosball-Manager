import { TestBed, async, inject } from '@angular/core/testing';

import { SecureInnerPages.Guard.TsGuard } from './secure-inner-pages.guard.ts.guard';

describe('SecureInnerPages.Guard.TsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecureInnerPages.Guard.TsGuard]
    });
  });

  it('should ...', inject([SecureInnerPages.Guard.TsGuard], (guard: SecureInnerPages.Guard.TsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
