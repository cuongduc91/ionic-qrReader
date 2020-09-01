import { ToastController } from "@ionic/angular";
import { Base64ToGallery } from "@ionic-native/base64-to-gallery/ngx";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  qrData = "https://google.com";
  scannedCode = null;
  elementType: "url" | "canvas" | "image" = "canvas";
  constructor(
    private barcodeScanner: BarcodeScanner,
    private base64ToGallery: Base64ToGallery,
    private toastCtrl: ToastController
  ) {}
  scanCode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.scannedCode = barcodeData.text;
    });
  }
  downloadQR() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const imageData = canvas.toDataURL("image/jpeg").toString();

    let data = imageData.split(",")[1];
    console.log("data: ", data);
    this.base64ToGallery
      .base64ToGallery(data, { prefix: "_img", mediaScanner: true })
      .then(
        async (res) => {
          let toast = await this.toastCtrl.create({
            header: "QR Code saved in your Photolibrary",
          });
          toast.present();
        },
        (err) => console.log("err: ", err)
      );
  }
}
