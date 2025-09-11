import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { WorkitemResolver } from './workitem.resolver';

describe('workitemResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => WorkitemResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
