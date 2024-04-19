/**
 *
 *
 *
 * @author Justin Swinney
 * @Date 3/25/2024
 * @version 1.0
 *
 * */

import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {NoAuthGuard} from './no-auth.guard';

describe('noAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => NoAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
