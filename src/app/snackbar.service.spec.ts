import { TestBed } from '@angular/core/testing';

import { PopupService } from './snackbar.service';

describe('SnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopupService = TestBed.get(PopupService);
    expect(service).toBeTruthy();
  });
});
