import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClustaarWebchatSdkComponent } from './clustaar-webchat-sdk.component';

describe('ClustaarWebchatSdkComponent', () => {
  let component: ClustaarWebchatSdkComponent;
  let fixture: ComponentFixture<ClustaarWebchatSdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClustaarWebchatSdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClustaarWebchatSdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
