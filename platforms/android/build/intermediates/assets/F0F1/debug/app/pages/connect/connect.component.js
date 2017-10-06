"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var color_1 = require("color");
var bluetooth_device_1 = require("../../shared/bluetooth/bluetooth-device");
var animation = require("tns-core-modules/ui/animation");
var bluetooth = require("nativescript-bluetooth");
var dialogs = require("ui/dialogs");
var he = require('he');
var imageSource = require("image-source");
var timer = require("timer");
var ConnectComponent = (function () {
    function ConnectComponent(page) {
        this.page = page;
        this.isLoggingIn = true;
        this.isConnected = false;
        this.device = new bluetooth_device_1.BluetoothDevice();
        this.device.isConnected = false;
        this.device.UUID = "30:AE:A4:18:1B:16";
    }
    ConnectComponent.prototype.changeImage = function () {
        var wifiImage = this.wifi.nativeElement;
        var wifiInactiveImage = this.wifiinactive.nativeElement;
        this.animationSet = new animation.Animation([{
                target: wifiImage,
                opacity: 0,
                duration: 1000,
                iterations: Number.POSITIVE_INFINITY,
            }]);
        this.animationSet.play().catch(function (e) {
            console.log("Animation stopped!");
        });
        var animationInactive = new animation.Animation([{
                target: wifiInactiveImage,
                opacity: 100,
                duration: 2000,
                iterations: Number.POSITIVE_INFINITY,
            }]);
        animationInactive.play().catch(function (e) {
            console.log("Animation stopped!");
        });
    };
    ConnectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = false;
        this.page.backgroundColor = new color_1.Color("#4E2C52");
        var img = imageSource.fromResource("wifi_inactif");
        this.bluetoothEnabled()
            .then(function (enabled) {
            if (enabled) {
                console.log("Bluetooth enabled");
                _this.getPermission();
                _this.connectToEsp("30:AE:A4:18:1B:16");
            }
            else {
                bluetooth.enable().then(function (enabled) {
                    if (enabled) {
                        console.log("Bluetooth enabled");
                        _this.getPermission();
                        _this.connectToEsp("30:AE:A4:18:1B:16");
                    }
                    else {
                        alert("Cannot use the application without bluetooth");
                    }
                });
            }
        });
    };
    ConnectComponent.prototype.saveTableNumber = function () {
        if (this.device.isConnected) {
            if (this.device.tableNumber) {
                console.log("Device Name: " + this.device.name);
                console.log("Device UUID: " + this.device.UUID);
                console.log("Table Number: " + this.device.tableNumber);
                this.writeTableNumber(this.device.tableNumber, this.device.UUID);
            }
            else {
                dialogs.alert({
                    title: "Table number empty",
                    message: "Please enter the table number",
                    okButtonText: "Ok"
                });
            }
        }
        else {
            alert("No devices connected");
            this.connectToEsp(this.device.UUID);
        }
    };
    ConnectComponent.prototype.bluetoothEnabled = function () {
        return bluetooth.isBluetoothEnabled();
    };
    ConnectComponent.prototype.getPermission = function () {
        bluetooth.hasCoarseLocationPermission()
            .then(function (granted) {
            if (!granted) {
                bluetooth.requestCoarseLocationPermission()
                    .then(function () { return console.log("Location permission requested"); });
            }
            else {
                console.log("Permission granted");
            }
        });
    };
    ConnectComponent.prototype.connectToEsp = function (id) {
        var _this = this;
        console.log("Trying to connect with: " + id);
        bluetooth.connect({
            UUID: id,
            onConnected: function (peripheral) {
                console.log('Connected: ' + peripheral.name);
                _this.device.isConnected = true;
                _this.device.name = peripheral.name;
                // peripheral.services.forEach((service) => {
                //   console.log("service found: " + JSON.stringify(service))
                // });
                _this.changeImage();
                // this.writeTableNumber(this.device.table_number, id);
            },
            onDisconnected: function (peripheral) {
                console.log('Disconnected: ' + peripheral.name);
                _this.connectToEsp(id);
            }
        });
    };
    ConnectComponent.prototype.writeTableNumber = function (number, id) {
        // let encodedString = encoder.encode("test");
        var utfString = he.encode(number, { 'encodeEverything': true });
        utfString = utfString.replace(new RegExp(';', 'g'), ",");
        utfString = utfString.replace(new RegExp('&#', 'g'), "0");
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
            .then(function () {
            alert("Table number saved");
        })
            .catch(function (err) {
            alert("Error: " + err);
        });
    };
    return ConnectComponent;
}());
__decorate([
    core_1.ViewChild("wifi"),
    __metadata("design:type", core_1.ElementRef)
], ConnectComponent.prototype, "wifi", void 0);
__decorate([
    core_1.ViewChild("wifiinactive"),
    __metadata("design:type", core_1.ElementRef)
], ConnectComponent.prototype, "wifiinactive", void 0);
ConnectComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        providers: [],
        templateUrl: "pages/connect/connect.html",
        styleUrls: ["pages/connect/connect-common.css", "pages/connect/connect.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page])
], ConnectComponent);
exports.ConnectComponent = ConnectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQUN6RSxnQ0FBK0I7QUFDL0IsK0JBQThCO0FBSTlCLDRFQUEwRTtBQUMxRSx5REFBMkQ7QUFDM0Qsa0RBQXFEO0FBRXJELG9DQUFzQztBQUN0QyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdkIsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzVDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQVE3QixJQUFhLGdCQUFnQjtJQVMzQiwwQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFSOUIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFRbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFlLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUM7SUFDekMsQ0FBQztJQUVELHNDQUFXLEdBQVg7UUFDRSxJQUFJLFNBQVMsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUMvQyxJQUFJLGlCQUFpQixHQUFVLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRS9ELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNDLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixPQUFPLEVBQUUsQ0FBQztnQkFDVixRQUFRLEVBQUUsSUFBSTtnQkFDZCxVQUFVLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjthQUVyQyxDQUFDLENB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LEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBbEtELElBa0tDO0FBNUpvQjtJQUFsQixnQkFBUyxDQUFDLE1BQU0sQ0FBQzs4QkFBTyxpQkFBVTs4Q0FBQztBQUNUO0lBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDOzhCQUFlLGlCQUFVO3NEQUFDO0FBUHpDLGdCQUFnQjtJQU41QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsU0FBUyxFQUFFLEVBQUU7UUFDYixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxFQUFFLDJCQUEyQixDQUFDO0tBQzdFLENBQUM7cUNBVTBCLFdBQUk7R0FUbkIsZ0JBQWdCLENBa0s1QjtBQWxLWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xyXG5pbXBvcnQgeyBzZXRIaW50Q29sb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaGludC11dGlsXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInVpL2ltYWdlXCI7XHJcbmltcG9ydCB7IEJsdWV0b290aERldmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvYmx1ZXRvb3RoL2JsdWV0b290aC1kZXZpY2VcIjtcclxuaW1wb3J0ICogYXMgYW5pbWF0aW9uIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQgYmx1ZXRvb3RoID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWJsdWV0b290aCcpO1xyXG5pbXBvcnQgKiBhcyB1dGY4IGZyb20gXCJ1dGY4XCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxudmFyIGhlID0gcmVxdWlyZSgnaGUnKTtcclxuXHJcbmNvbnN0IGltYWdlU291cmNlID0gcmVxdWlyZShcImltYWdlLXNvdXJjZVwiKTtcclxudmFyIHRpbWVyID0gcmVxdWlyZShcInRpbWVyXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXHJcbiAgcHJvdmlkZXJzOiBbXSxcclxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9jb25uZWN0L2Nvbm5lY3QuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wicGFnZXMvY29ubmVjdC9jb25uZWN0LWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9jb25uZWN0L2Nvbm5lY3QuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb25uZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBpc0xvZ2dpbmdJbiA9IHRydWU7XHJcbiAgaXNDb25uZWN0ZWQgPSBmYWxzZTtcclxuICBhbmltYXRpb25TZXQ6IGFuaW1hdGlvbi5BbmltYXRpb247XHJcbiAgZGV2aWNlOiBCbHVldG9vdGhEZXZpY2U7XHJcblxyXG4gIEBWaWV3Q2hpbGQoXCJ3aWZpXCIpIHdpZmk6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcIndpZmlpbmFjdGl2ZVwiKSB3aWZpaW5hY3RpdmU6IEVsZW1lbnRSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgdGhpcy5kZXZpY2UgPSBuZXcgQmx1ZXRvb3RoRGV2aWNlKCk7XHJcbiAgICB0aGlzLmRldmljZS5pc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5kZXZpY2UuVVVJRCA9IFwiMzA6QUU6QTQ6MTg6MUI6MTZcIjtcclxuICB9XHJcbiAgXHJcbiAgY2hhbmdlSW1hZ2UoKSB7XHJcbiAgICBsZXQgd2lmaUltYWdlID0gPEltYWdlPnRoaXMud2lmaS5uYXRpdmVFbGVtZW50O1xyXG4gICAgbGV0IHdpZmlJbmFjdGl2ZUltYWdlID0gPEltYWdlPnRoaXMud2lmaWluYWN0aXZlLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5hbmltYXRpb25TZXQgPSBuZXcgYW5pbWF0aW9uLkFuaW1hdGlvbihbe1xyXG4gICAgICB0YXJnZXQ6IHdpZmlJbWFnZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgIGl0ZXJhdGlvbnM6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcclxuICAgICAgXHJcbiAgICB9XSk7XHJcbiAgICB0aGlzLmFuaW1hdGlvblNldC5wbGF5KCkuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFuaW1hdGlvbiBzdG9wcGVkIVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGFuaW1hdGlvbkluYWN0aXZlID0gbmV3IGFuaW1hdGlvbi5BbmltYXRpb24oW3tcclxuICAgICAgdGFyZ2V0OiB3aWZpSW5hY3RpdmVJbWFnZSxcclxuICAgICAgb3BhY2l0eTogMTAwLFxyXG4gICAgICBkdXJhdGlvbjogMjAwMCxcclxuICAgICAgaXRlcmF0aW9uczogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLFxyXG4gICAgICBcclxuICAgIH1dKTtcclxuICAgIGFuaW1hdGlvbkluYWN0aXZlLnBsYXkoKS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQW5pbWF0aW9uIHN0b3BwZWQhXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSBmYWxzZTtcclxuICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjNEUyQzUyXCIpO1xyXG5cclxuICAgIGNvbnN0IGltZyA9IGltYWdlU291cmNlLmZyb21SZXNvdXJjZShcIndpZmlfaW5hY3RpZlwiKTtcclxuXHJcbiAgICB0aGlzLmJsdWV0b290aEVuYWJsZWQoKVxyXG4gICAgICAudGhlbihcclxuICAgICAgICAoZW5hYmxlZCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCbHVldG9vdGggZW5hYmxlZFwiKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRQZXJtaXNzaW9uKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RUb0VzcChcIjMwOkFFOkE0OjE4OjFCOjE2XCIpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgfSBcclxuICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJsdWV0b290aC5lbmFibGUoKS50aGVuKFxyXG4gICAgICAgICAgICAgIChlbmFibGVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJsdWV0b290aCBlbmFibGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmdldFBlcm1pc3Npb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvRXNwKFwiMzA6QUU6QTQ6MTg6MUI6MTZcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgYWxlcnQoXCJDYW5ub3QgdXNlIHRoZSBhcHBsaWNhdGlvbiB3aXRob3V0IGJsdWV0b290aFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgKSAgXHJcbiAgfVxyXG5cclxuICBzYXZlVGFibGVOdW1iZXIoKSB7XHJcbiAgICBpZiAodGhpcy5kZXZpY2UuaXNDb25uZWN0ZWQpIHtcclxuICAgICAgaWYgKHRoaXMuZGV2aWNlLnRhYmxlTnVtYmVyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJEZXZpY2UgTmFtZTogXCIgKyB0aGlzLmRldmljZS5uYW1lKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkRldmljZSBVVUlEOiBcIiArIHRoaXMuZGV2aWNlLlVVSUQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGFibGUgTnVtYmVyOiBcIiArIHRoaXMuZGV2aWNlLnRhYmxlTnVtYmVyKTtcclxuICAgICAgICB0aGlzLndyaXRlVGFibGVOdW1iZXIodGhpcy5kZXZpY2UudGFibGVOdW1iZXIsIHRoaXMuZGV2aWNlLlVVSUQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgdGl0bGU6IFwiVGFibGUgbnVtYmVyIGVtcHR5XCIsXHJcbiAgICAgICAgICBtZXNzYWdlOiBcIlBsZWFzZSBlbnRlciB0aGUgdGFibGUgbnVtYmVyXCIsXHJcbiAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICBhbGVydChcIk5vIGRldmljZXMgY29ubmVjdGVkXCIpO1xyXG4gICAgICB0aGlzLmNvbm5lY3RUb0VzcCh0aGlzLmRldmljZS5VVUlEKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJsdWV0b290aEVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gYmx1ZXRvb3RoLmlzQmx1ZXRvb3RoRW5hYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGVybWlzc2lvbigpIHtcclxuICAgICAgYmx1ZXRvb3RoLmhhc0NvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAudGhlbigoZ3JhbnRlZCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghZ3JhbnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICBibHVldG9vdGgucmVxdWVzdENvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIHBlcm1pc3Npb24gcmVxdWVzdGVkXCIpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVybWlzc2lvbiBncmFudGVkXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdFRvRXNwKGlkOiBzdHJpbmcpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJUcnlpbmcgdG8gY29ubmVjdCB3aXRoOiBcIiArIGlkKTtcclxuICAgICAgYmx1ZXRvb3RoLmNvbm5lY3Qoe1xyXG4gICAgICAgICAgVVVJRDogaWQsXHJcbiAgICAgICAgICBvbkNvbm5lY3RlZDogKHBlcmlwaGVyYWwpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkOiAnICsgcGVyaXBoZXJhbC5uYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLmRldmljZS5pc0Nvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgdGhpcy5kZXZpY2UubmFtZSA9IHBlcmlwaGVyYWwubmFtZTtcclxuICAgICAgICAgICAgICAvLyBwZXJpcGhlcmFsLnNlcnZpY2VzLmZvckVhY2goKHNlcnZpY2UpID0+IHtcclxuICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwic2VydmljZSBmb3VuZDogXCIgKyBKU09OLnN0cmluZ2lmeShzZXJ2aWNlKSlcclxuICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIHRoaXMud3JpdGVUYWJsZU51bWJlcih0aGlzLmRldmljZS50YWJsZV9udW1iZXIsIGlkKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvbkRpc2Nvbm5lY3RlZDogKHBlcmlwaGVyYWwpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRGlzY29ubmVjdGVkOiAnICsgcGVyaXBoZXJhbC5uYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb0VzcChpZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVUYWJsZU51bWJlcihudW1iZXI6IHN0cmluZywgaWQ6IHN0cmluZykge1xyXG4gICAgICAvLyBsZXQgZW5jb2RlZFN0cmluZyA9IGVuY29kZXIuZW5jb2RlKFwidGVzdFwiKTtcclxuICAgICAgbGV0IHV0ZlN0cmluZyA9IGhlLmVuY29kZShudW1iZXIsIHsnZW5jb2RlRXZlcnl0aGluZyc6IHRydWV9KTtcclxuICAgICAgdXRmU3RyaW5nID0gdXRmU3RyaW5nLnJlcGxhY2UobmV3IFJlZ0V4cCgnOycsJ2cnKSwgXCIsXCIpO1xyXG4gICAgICB1dGZTdHJpbmcgPSB1dGZTdHJpbmcucmVwbGFjZShuZXcgUmVnRXhwKCcmIycsJ2cnKSwgXCIwXCIpO1xyXG4gICAgICAvLyB1dGZTdHJpbmcgPSB1dGZTdHJpbmcuc3Vic3RyaW5nKDAsIHV0ZlN0cmluZy5sZW5naHQgLSAxKTtcclxuICAgICAgLy8gbGV0IHV0ZlN0cmluZyA9IHV0ZjguZGVjb2RlKFwiXFx4NzRcXHg2NVxceDczXFx4NzRcIik7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGhlLmVuY29kZShcInRlc3RcIiwgeydlbmNvZGVFdmVyeXRoaW5nJzogdHJ1ZX0pKTtcclxuICAgICAgY29uc29sZS5sb2codXRmU3RyaW5nKTsgIFxyXG5cclxuICAgICAgYmx1ZXRvb3RoLndyaXRlKHtcclxuICAgICAgICBwZXJpcGhlcmFsVVVJRDogaWQsXHJcbiAgICAgICAgc2VydmljZVVVSUQ6IFwiMDBmZlwiLFxyXG4gICAgICAgIGNoYXJhY3RlcmlzdGljVVVJRDogXCJmZjAxXCIsXHJcbiAgICAgICAgdmFsdWU6IHV0ZlN0cmluZ1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJUYWJsZSBudW1iZXIgc2F2ZWRcIik7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJFcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICB9KTtcclxuICB9XHJcbn0iXX0=