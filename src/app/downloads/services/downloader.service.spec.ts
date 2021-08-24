import { TestBed } from '@angular/core/testing';

import { DownloaderService } from './downloader.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DownloaderService', () => {
  let service: DownloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(DownloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
