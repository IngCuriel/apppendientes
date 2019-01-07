import { TestBed } from '@angular/core/testing';

import { PendienteService } from './pendiente.service';

describe('PendienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendienteService = TestBed.get(PendienteService);
    expect(service).toBeTruthy();
  });
});
