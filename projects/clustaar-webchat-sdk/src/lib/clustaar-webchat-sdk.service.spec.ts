import { TestBed } from '@angular/core/testing';

import { ClustaarWebchatSdkService } from './clustaar-webchat-sdk.service';

describe('ClustaarWebchatSdkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClustaarWebchatSdkService = TestBed.get(ClustaarWebchatSdkService);
    expect(service).toBeTruthy();
  });
});
