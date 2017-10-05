import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Page } from "ui/page";
import { Color } from "color";
import { setHintColor } from "../../utils/hint-util";
import { TextField } from "ui/text-field";
import { Image } from "ui/image";
import { BluetoothDevice } from "../../shared/bluetooth/bluetooth-device";
import * as animation from "tns-core-modules/ui/animation";

import bluetooth = require('nativescript-bluetooth');
// import encoder = require("text-encoding");
import * as utf8 from "utf8";

const imageSource = require("image-source");
var timer = require("timer");

@Component({
  selector: "my-app",
  providers: [],
  templateUrl: "pages/connect/connect.html",
  styleUrls: ["pages/connect/connect-common.css", "pages/connect/connect.css"]
})
export class ConnectComponent implements OnInit {
  isLoggingIn = true;
  isConnected = false;
  animationSet: animation.Animation;

  @ViewChild("wifi") wifi: ElementRef;
  @ViewChild("wifiinactive") wifiinactive: ElementRef;

  constructor(private page: Page) {}
  
  changeImage() {
    let wifiImage = <Image>this.wifi.nativeElement;
    let wifiInactiveImage = <Image>this.wifiinactive.nativeElement;

    this.animationSet = new animation.Animation([{
      target: wifiImage,
      opacity: 0,
      duration: 1000,
      iterations: Number.POSITIVE_INFINITY,
      
    }]);
    this.animationSet.play().catch((e) => {
        console.log("Animation stopped!");
    });

    const animationInactive = new animation.Animation([{
      target: wifiInactiveImage,
      opacity: 100,
      duration: 2000,
      iterations: Number.POSITIVE_INFINITY,
      
    }]);
    animationInactive.play().catch((e) => {
        console.log("Animation stopped!");
    });
  }

  ngOnInit() {
    this.page.actionBarHidden = false;
    this.page.backgroundColor = new Color("#4E2C52");

    const img = imageSource.fromResource("wifi_inactif");

    this.bluetoothEnabled()
      .then(
        (enabled) => {
          if (enabled) {
            console.log("Bluetooth enabled");
            this.getPermission();

            this.connectToEsp("30:AE:A4:18:1B:16");
            // this.connectToEsp("30:AE:A4:18:1B:12");
            
          } else {
            bluetooth.enable().then(
              (enabled) => {
                if (enabled) {
                  console.log("Bluetooth enabled");
                  this.getPermission();
      
                  this.connectToEsp("30:AE:A4:18:1B:16");
                }
                else {
                  alert("Cannot use the application without bluetooth");
                }
              }
            );
          }

        }
      )  
  }

  bluetoothEnabled() {
    return bluetooth.isBluetoothEnabled();
  }

  getPermission() {
      bluetooth.hasCoarseLocationPermission()
          .then((granted) => {
              if (!granted) {
                  bluetooth.requestCoarseLocationPermission()
                      .then(() => console.log("Location permission requested"));
              }
              else {
                  console.log("Permission granted");
              }
          });
  }

  connectToEsp(id: string) {
      console.log("Trying to connect with: " + id);
      bluetooth.connect({
          UUID: id,
          onConnected: (peripheral) => {
              console.log('Connected: ' + peripheral.name);
              // peripheral.services.forEach((service) => {
              //   console.log("service found: " + JSON.stringify(service))
              // });
              this.changeImage();

              this.writeTableNumber(1, id);
          },
          onDisconnected: (peripheral) => {
              console.log('Disconnected: ' + peripheral.name);
              this.connectToEsp(id);
          }
      });
  }

  writeTableNumber(number: number, id: string) {
      // let encodedString = encoder.encode("test");
      let utfString = utf8.encode("Test");

      bluetooth.write({
        peripheralUUID: id,
        serviceUUID: "00ff",
        characteristicUUID: "ff01",
        value: utfString
      })
      .then(() => {
        alert("Table number saved");
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  }
}