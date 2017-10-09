import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Page } from "ui/page";
import { Color } from "color";
import { setHintColor } from "../../utils/hint-util";
import { TextField } from "ui/text-field";
import { Image } from "ui/image";
import { Router } from "@angular/router";
import { BluetoothDevice } from "../../shared/bluetooth/bluetooth-device";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ModalViewComponent } from "../../pages/modal-view/modal-view.component";
import { ConfigurationModel } from "../../shared/configuration/configuration";
import * as applicationSettings from "tns-core-modules/application-settings";

import * as animation from "tns-core-modules/ui/animation";
import bluetooth = require('nativescript-bluetooth');
import * as utf8 from "utf8";
import * as dialogs from "ui/dialogs";
var he = require('he');

const imageSource = require("image-source");
var timer = require("timer");

@Component({
  selector: "my-app",
  providers: [ModalDialogService],
  entryComponents: [ModalViewComponent],
  templateUrl: "pages/connect/connect.html",
  styleUrls: ["pages/connect/connect-common.css", "pages/connect/connect.css"]
})
export class ConnectComponent implements OnInit {
  config: ConfigurationModel;
  isLoggingIn = true;
  isConnected = false;
  animationSet: animation.Animation;
  device: BluetoothDevice;

  @ViewChild("wifi") wifi: ElementRef;
  @ViewChild("wifiinactive") wifiinactive: ElementRef;
  @ViewChild("device-id") deviceId: ElementRef;

  constructor(private page: Page, private modalService: ModalDialogService, private vcRef: ViewContainerRef, private router: Router) {
    this.device = new BluetoothDevice();
    this.device.isConnected = false;
    this.device.UUID = "30:AE:A4:18:1B:16";

    this.config = new ConfigurationModel();
  }

  ngOnInit() {
    this.config.wifi_ssid = applicationSettings.getString("wifiSSID");
    this.config.wifi_password = applicationSettings.getString("wifiPassword");

    if (!this.config.wifi_ssid) {
      this.router.navigate(["/configuration"]);  
    }

    this.page.actionBarHidden = false;
    this.page.backgroundColor = new Color("#4E2C52");

    this.setTextFieldColor();

    const img = imageSource.fromResource("wifi_inactif");

    this.bluetoothEnabled()
      .then(
        (enabled) => {
          if (enabled) {
            console.log("Bluetooth enabled");
            this.getPermission();

            this.connectToEsp("30:AE:A4:18:1B:16");            
          } 
          else 
          {
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

  saveTableNumber() {
    if (this.device.isConnected) {
      if (this.device.tableNumber) {
        console.log("Device Name: " + this.device.name);
        console.log("Device UUID: " + this.device.UUID);
        console.log("Table Number: " + this.device.tableNumber);
        this.writeTableNumber(this.device.tableNumber, this.device.UUID);
      } else {
        // dialogs.alert({
        //   title: "Table number empty",
        //   message: "Please enter the table number",
        //   okButtonText: "Ok"
        // });
        this.createModalView("Table number empty", "Please enter the table number")
          .then()
          .catch((err) => {
            this.handleError(err);
          });
      }
    } 
    else
    {
      alert("No devices connected");
      this.connectToEsp(this.device.UUID);
    }
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
              this.device.isConnected = true;
              this.device.name = peripheral.name;
              // peripheral.services.forEach((service) => {
              //   console.log("service found: " + JSON.stringify(service))
              // });
              this.changeImage();

              // this.writeTableNumber(this.device.table_number, id);
          },
          onDisconnected: (peripheral) => {
              console.log('Disconnected: ' + peripheral.name);
              this.connectToEsp(id);
          }
      });
  }

  writeTableNumber(number: string, id: string) {
      // let encodedString = encoder.encode("test");
      let utfString = he.encode(number, {'encodeEverything': true});
      utfString = utfString.replace(new RegExp(';','g'), ",");
      utfString = utfString.replace(new RegExp('&#','g'), "0");
      // utfString = utfString.substring(0, utfString.lenght - 1);
      // let utfString = utf8.decode("\x74\x65\x73\x74");
      // console.log(he.encode("test", {'encodeEverything': true}));
      console.log(utfString);  

      bluetooth.write({
        peripheralUUID: id,
        serviceUUID: "00ff",
        characteristicUUID: "ff01",
        value: utfString
      })
      .then(() => {
        this.createModalView("Success !!", "Table number saved")
        .then()
        .catch((err) => {
          this.handleError(err);
        });
      })
      .catch((err) => {
        this.createModalView("Error", err)
        .then()
        .catch((err) => {
          this.handleError(err);
        });
      });
  }

  
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
        // console.log("Animation stopped!");
    });
  }

  private createModalView(title: string, message: string): Promise<any> {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: {title: title, message: message},
      fullscreen: false,      
    };

    return this.modalService.showModal(ModalViewComponent, options);
  }

  private handleError(error: any) {
    alert("Error: " + error);
    console.dir(error);
  }

  setTextFieldColor() {
    let deviceIdTextField = <TextField>this.deviceId.nativeElement;

    let mainTextColor = new Color("#ffffff");
    deviceIdTextField.color = mainTextColor;
    let hintColor = new Color("#ffffff");
    setHintColor({ view: deviceIdTextField, color: hintColor });
  }
}