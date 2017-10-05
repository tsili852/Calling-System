import { Injectable } from '@angular/core';
import bluetooth = require('nativescript-bluetooth');
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/distinctUntilChanged';

import { BluetoothDevice } from "./bluetooth-device";

@Injectable()
export class BluetoothService {
    constructor() {}

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
            },
            onDisconnected: (peripheral) => {
                this.connectToEsp(id);
            }
        });
    }

    writeTableNumber(number: number) {
        
    }
}