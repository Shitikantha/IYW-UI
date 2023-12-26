import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.css']
})
export class WebCamComponent implements AfterViewInit{
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: any;
  public videoOptions: MediaTrackConstraints = {
    width: {ideal: 1024},
    height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();


  // other implements
  @ViewChild("video")
  public video!: ElementRef;
  @ViewChild("canvas")
  public canvas!: ElementRef;
  public captures!: Array<any>;

  constructor(private activeModal : NgbActiveModal){
    this.captures = [];
  }

  ngAfterViewInit(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    var context = this.canvas.nativeElement
      .getContext("2d")
      .drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.video.nativeElement.pause();
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    const file = this.dataURLtoFile(this.captures[0], 'a1.png');
    console.log(file);
  }

  reCapture(){
    this.captures = []
    this.video.nativeElement.play();
  }

  public dataURLtoFile(dataurl:any, filename:any) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.activeModal.close(webcamImage);
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
}
