import { TestBed } from '@angular/core/testing';

import { ArticuloService } from './producto.service';

describe('ArticuloService', () => {
  let service: ArticuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
