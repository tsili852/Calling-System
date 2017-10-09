"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var color_1 = require("color");
var hint_util_1 = require("../../utils/hint-util");
var router_1 = require("@angular/router");
var bluetooth_device_1 = require("../../shared/bluetooth/bluetooth-device");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var modal_view_component_1 = require("../../pages/modal-view/modal-view.component");
var animation = require("tns-core-modules/ui/animation");
var bluetooth = require("nativescript-bluetooth");
var he = require('he');
var imageSource = require("image-source");
var timer = require("timer");
var ConnectComponent = (function () {
    function ConnectComponent(page, modalService, vcRef, router) {
        this.page = page;
        this.modalService = modalService;
        this.vcRef = vcRef;
        this.router = router;
        this.isLoggingIn = true;
        this.isConnected = false;
        this.device = new bluetooth_device_1.BluetoothDevice();
        this.device.isConnected = false;
        this.device.UUID = "30:AE:A4:18:1B:16";
    }
    ConnectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.navigate(["/configuration"]);
        this.page.actionBarHidden = false;
        this.page.backgroundColor = new color_1.Color("#4E2C52");
        this.setTextFieldColor();
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
        var _this = this;
        if (this.device.isConnected) {
            if (this.device.tableNumber) {
                console.log("Device Name: " + this.device.name);
                console.log("Device UUID: " + this.device.UUID);
                console.log("Table Number: " + this.device.tableNumber);
                this.writeTableNumber(this.device.tableNumber, this.device.UUID);
            }
            else {
                // dialogs.alert({
                //   title: "Table number empty",
                //   message: "Please enter the table number",
                //   okButtonText: "Ok"
                // });
                this.createModalView("Table number empty", "Please enter the table number")
                    .then()
                    .catch(function (err) {
                    _this.handleError(err);
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
        var _this = this;
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
            _this.createModalView("Success !!", "Table number saved")
                .then()
                .catch(function (err) {
                _this.handleError(err);
            });
        })
            .catch(function (err) {
            _this.createModalView("Error", err)
                .then()
                .catch(function (err) {
                _this.handleError(err);
            });
        });
    };
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
            // console.log("Animation stopped!");
        });
    };
    ConnectComponent.prototype.createModalView = function (title, message) {
        var options = {
            viewContainerRef: this.vcRef,
            context: { title: title, message: message },
            fullscreen: false,
        };
        return this.modalService.showModal(modal_view_component_1.ModalViewComponent, options);
    };
    ConnectComponent.prototype.handleError = function (error) {
        alert("Error: " + error);
        console.dir(error);
    };
    ConnectComponent.prototype.setTextFieldColor = function () {
        var deviceIdTextField = this.deviceId.nativeElement;
        var mainTextColor = new color_1.Color("#ffffff");
        deviceIdTextField.color = mainTextColor;
        var hintColor = new color_1.Color("#ffffff");
        hint_util_1.setHintColor({ view: deviceIdTextField, color: hintColor });
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
__decorate([
    core_1.ViewChild("device-id"),
    __metadata("design:type", core_1.ElementRef)
], ConnectComponent.prototype, "deviceId", void 0);
ConnectComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        providers: [modal_dialog_1.ModalDialogService],
        entryComponents: [modal_view_component_1.ModalViewComponent],
        templateUrl: "pages/connect/connect.html",
        styleUrls: ["pages/connect/connect-common.css", "pages/connect/connect.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page, modal_dialog_1.ModalDialogService, core_1.ViewContainerRef, router_1.Router])
], ConnectComponent);
exports.ConnectComponent = ConnectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUMzRixnQ0FBK0I7QUFDL0IsK0JBQThCO0FBQzlCLG1EQUFxRDtBQUdyRCwwQ0FBeUM7QUFDekMsNEVBQTBFO0FBQzFFLGtFQUEyRjtBQUMzRixvRkFBaUY7QUFFakYseURBQTJEO0FBQzNELGtEQUFxRDtBQUdyRCxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdkIsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzVDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQVM3QixJQUFhLGdCQUFnQjtJQVUzQiwwQkFBb0IsSUFBVSxFQUFVLFlBQWdDLEVBQVUsS0FBdUIsRUFBVSxNQUFjO1FBQTdHLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFUakksZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFTbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFlLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUM7SUFDekMsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkF1Q0M7UUFyQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFD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ImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XHJcbmltcG9ydCB7IHNldEhpbnRDb2xvciB9IGZyb20gXCIuLi8uLi91dGlscy9oaW50LXV0aWxcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBCbHVldG9vdGhEZXZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2JsdWV0b290aC9ibHVldG9vdGgtZGV2aWNlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBNb2RhbFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vcGFnZXMvbW9kYWwtdmlldy9tb2RhbC12aWV3LmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0ICogYXMgYW5pbWF0aW9uIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQgYmx1ZXRvb3RoID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWJsdWV0b290aCcpO1xyXG5pbXBvcnQgKiBhcyB1dGY4IGZyb20gXCJ1dGY4XCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxudmFyIGhlID0gcmVxdWlyZSgnaGUnKTtcclxuXHJcbmNvbnN0IGltYWdlU291cmNlID0gcmVxdWlyZShcImltYWdlLXNvdXJjZVwiKTtcclxudmFyIHRpbWVyID0gcmVxdWlyZShcInRpbWVyXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXHJcbiAgcHJvdmlkZXJzOiBbTW9kYWxEaWFsb2dTZXJ2aWNlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtNb2RhbFZpZXdDb21wb25lbnRdLFxyXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2Nvbm5lY3QvY29ubmVjdC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9jb25uZWN0L2Nvbm5lY3QtY29tbW9uLmNzc1wiLCBcInBhZ2VzL2Nvbm5lY3QvY29ubmVjdC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbm5lY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGlzTG9nZ2luZ0luID0gdHJ1ZTtcclxuICBpc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gIGFuaW1hdGlvblNldDogYW5pbWF0aW9uLkFuaW1hdGlvbjtcclxuICBkZXZpY2U6IEJsdWV0b290aERldmljZTtcclxuXHJcbiAgQFZpZXdDaGlsZChcIndpZmlcIikgd2lmaTogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwid2lmaWluYWN0aXZlXCIpIHdpZmlpbmFjdGl2ZTogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZGV2aWNlLWlkXCIpIGRldmljZUlkOiBFbGVtZW50UmVmO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgIHRoaXMuZGV2aWNlID0gbmV3IEJsdWV0b290aERldmljZSgpO1xyXG4gICAgdGhpcy5kZXZpY2UuaXNDb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZGV2aWNlLlVVSUQgPSBcIjMwOkFFOkE0OjE4OjFCOjE2XCI7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvY29uZmlndXJhdGlvblwiXSk7XHJcblxyXG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5wYWdlLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiM0RTJDNTJcIik7XHJcblxyXG4gICAgdGhpcy5zZXRUZXh0RmllbGRDb2xvcigpO1xyXG5cclxuICAgIGNvbnN0IGltZyA9IGltYWdlU291cmNlLmZyb21SZXNvdXJjZShcIndpZmlfaW5hY3RpZlwiKTtcclxuXHJcbiAgICB0aGlzLmJsdWV0b290aEVuYWJsZWQoKVxyXG4gICAgICAudGhlbihcclxuICAgICAgICAoZW5hYmxlZCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCbHVldG9vdGggZW5hYmxlZFwiKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRQZXJtaXNzaW9uKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RUb0VzcChcIjMwOkFFOkE0OjE4OjFCOjE2XCIpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgfSBcclxuICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJsdWV0b290aC5lbmFibGUoKS50aGVuKFxyXG4gICAgICAgICAgICAgIChlbmFibGVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJsdWV0b290aCBlbmFibGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmdldFBlcm1pc3Npb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvRXNwKFwiMzA6QUU6QTQ6MTg6MUI6MTZcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgYWxlcnQoXCJDYW5ub3QgdXNlIHRoZSBhcHBsaWNhdGlvbiB3aXRob3V0IGJsdWV0b290aFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgKSAgXHJcbiAgfVxyXG5cclxuICBzYXZlVGFibGVOdW1iZXIoKSB7XHJcbiAgICBpZiAodGhpcy5kZXZpY2UuaXNDb25uZWN0ZWQpIHtcclxuICAgICAgaWYgKHRoaXMuZGV2aWNlLnRhYmxlTnVtYmVyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJEZXZpY2UgTmFtZTogXCIgKyB0aGlzLmRldmljZS5uYW1lKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkRldmljZSBVVUlEOiBcIiArIHRoaXMuZGV2aWNlLlVVSUQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGFibGUgTnVtYmVyOiBcIiArIHRoaXMuZGV2aWNlLnRhYmxlTnVtYmVyKTtcclxuICAgICAgICB0aGlzLndyaXRlVGFibGVOdW1iZXIodGhpcy5kZXZpY2UudGFibGVOdW1iZXIsIHRoaXMuZGV2aWNlLlVVSUQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgIC8vICAgdGl0bGU6IFwiVGFibGUgbnVtYmVyIGVtcHR5XCIsXHJcbiAgICAgICAgLy8gICBtZXNzYWdlOiBcIlBsZWFzZSBlbnRlciB0aGUgdGFibGUgbnVtYmVyXCIsXHJcbiAgICAgICAgLy8gICBva0J1dHRvblRleHQ6IFwiT2tcIlxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTW9kYWxWaWV3KFwiVGFibGUgbnVtYmVyIGVtcHR5XCIsIFwiUGxlYXNlIGVudGVyIHRoZSB0YWJsZSBudW1iZXJcIilcclxuICAgICAgICAgIC50aGVuKClcclxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICBhbGVydChcIk5vIGRldmljZXMgY29ubmVjdGVkXCIpO1xyXG4gICAgICB0aGlzLmNvbm5lY3RUb0VzcCh0aGlzLmRldmljZS5VVUlEKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJsdWV0b290aEVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gYmx1ZXRvb3RoLmlzQmx1ZXRvb3RoRW5hYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGVybWlzc2lvbigpIHtcclxuICAgICAgYmx1ZXRvb3RoLmhhc0NvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAudGhlbigoZ3JhbnRlZCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghZ3JhbnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICBibHVldG9vdGgucmVxdWVzdENvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIHBlcm1pc3Npb24gcmVxdWVzdGVkXCIpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVybWlzc2lvbiBncmFudGVkXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdFRvRXNwKGlkOiBzdHJpbmcpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJUcnlpbmcgdG8gY29ubmVjdCB3aXRoOiBcIiArIGlkKTtcclxuICAgICAgYmx1ZXRvb3RoLmNvbm5lY3Qoe1xyXG4gICAgICAgICAgVVVJRDogaWQsXHJcbiAgICAgICAgICBvbkNvbm5lY3RlZDogKHBlcmlwaGVyYWwpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkOiAnICsgcGVyaXBoZXJhbC5uYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLmRldmljZS5pc0Nvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgdGhpcy5kZXZpY2UubmFtZSA9IHBlcmlwaGVyYWwubmFtZTtcclxuICAgICAgICAgICAgICAvLyBwZXJpcGhlcmFsLnNlcnZpY2VzLmZvckVhY2goKHNlcnZpY2UpID0+IHtcclxuICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwic2VydmljZSBmb3VuZDogXCIgKyBKU09OLnN0cmluZ2lmeShzZXJ2aWNlKSlcclxuICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIHRoaXMud3JpdGVUYWJsZU51bWJlcih0aGlzLmRldmljZS50YWJsZV9udW1iZXIsIGlkKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvbkRpc2Nvbm5lY3RlZDogKHBlcmlwaGVyYWwpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRGlzY29ubmVjdGVkOiAnICsgcGVyaXBoZXJhbC5uYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb0VzcChpZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVUYWJsZU51bWJlcihudW1iZXI6IHN0cmluZywgaWQ6IHN0cmluZykge1xyXG4gICAgICAvLyBsZXQgZW5jb2RlZFN0cmluZyA9IGVuY29kZXIuZW5jb2RlKFwidGVzdFwiKTtcclxuICAgICAgbGV0IHV0ZlN0cmluZyA9IGhlLmVuY29kZShudW1iZXIsIHsnZW5jb2RlRXZlcnl0aGluZyc6IHRydWV9KTtcclxuICAgICAgdXRmU3RyaW5nID0gdXRmU3RyaW5nLnJlcGxhY2UobmV3IFJlZ0V4cCgnOycsJ2cnKSwgXCIsXCIpO1xyXG4gICAgICB1dGZTdHJpbmcgPSB1dGZTdHJpbmcucmVwbGFjZShuZXcgUmVnRXhwKCcmIycsJ2cnKSwgXCIwXCIpO1xyXG4gICAgICAvLyB1dGZTdHJpbmcgPSB1dGZTdHJpbmcuc3Vic3RyaW5nKDAsIHV0ZlN0cmluZy5sZW5naHQgLSAxKTtcclxuICAgICAgLy8gbGV0IHV0ZlN0cmluZyA9IHV0ZjguZGVjb2RlKFwiXFx4NzRcXHg2NVxceDczXFx4NzRcIik7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGhlLmVuY29kZShcInRlc3RcIiwgeydlbmNvZGVFdmVyeXRoaW5nJzogdHJ1ZX0pKTtcclxuICAgICAgY29uc29sZS5sb2codXRmU3RyaW5nKTsgIFxyXG5cclxuICAgICAgYmx1ZXRvb3RoLndyaXRlKHtcclxuICAgICAgICBwZXJpcGhlcmFsVVVJRDogaWQsXHJcbiAgICAgICAgc2VydmljZVVVSUQ6IFwiMDBmZlwiLFxyXG4gICAgICAgIGNoYXJhY3RlcmlzdGljVVVJRDogXCJmZjAxXCIsXHJcbiAgICAgICAgdmFsdWU6IHV0ZlN0cmluZ1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVNb2RhbFZpZXcoXCJTdWNjZXNzICEhXCIsIFwiVGFibGUgbnVtYmVyIHNhdmVkXCIpXHJcbiAgICAgICAgLnRoZW4oKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVNb2RhbFZpZXcoXCJFcnJvclwiLCBlcnIpXHJcbiAgICAgICAgLnRoZW4oKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgY2hhbmdlSW1hZ2UoKSB7XHJcbiAgICBsZXQgd2lmaUltYWdlID0gPEltYWdlPnRoaXMud2lmaS5uYXRpdmVFbGVtZW50O1xyXG4gICAgbGV0IHdpZmlJbmFjdGl2ZUltYWdlID0gPEltYWdlPnRoaXMud2lmaWluYWN0aXZlLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5hbmltYXRpb25TZXQgPSBuZXcgYW5pbWF0aW9uLkFuaW1hdGlvbihbe1xyXG4gICAgICB0YXJnZXQ6IHdpZmlJbWFnZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgIGl0ZXJhdGlvbnM6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcclxuICAgICAgXHJcbiAgICB9XSk7XHJcbiAgICB0aGlzLmFuaW1hdGlvblNldC5wbGF5KCkuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFuaW1hdGlvbiBzdG9wcGVkIVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGFuaW1hdGlvbkluYWN0aXZlID0gbmV3IGFuaW1hdGlvbi5BbmltYXRpb24oW3tcclxuICAgICAgdGFyZ2V0OiB3aWZpSW5hY3RpdmVJbWFnZSxcclxuICAgICAgb3BhY2l0eTogMTAwLFxyXG4gICAgICBkdXJhdGlvbjogMjAwMCxcclxuICAgICAgaXRlcmF0aW9uczogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLFxyXG4gICAgICBcclxuICAgIH1dKTtcclxuICAgIGFuaW1hdGlvbkluYWN0aXZlLnBsYXkoKS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQW5pbWF0aW9uIHN0b3BwZWQhXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU1vZGFsVmlldyh0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xyXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxyXG4gICAgICBjb250ZXh0OiB7dGl0bGU6IHRpdGxlLCBtZXNzYWdlOiBtZXNzYWdlfSxcclxuICAgICAgZnVsbHNjcmVlbjogZmFsc2UsICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxWaWV3Q29tcG9uZW50LCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSkge1xyXG4gICAgYWxlcnQoXCJFcnJvcjogXCIgKyBlcnJvcik7XHJcbiAgICBjb25zb2xlLmRpcihlcnJvcik7XHJcbiAgfVxyXG5cclxuICBzZXRUZXh0RmllbGRDb2xvcigpIHtcclxuICAgIGxldCBkZXZpY2VJZFRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5kZXZpY2VJZC5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgIGxldCBtYWluVGV4dENvbG9yID0gbmV3IENvbG9yKFwiI2ZmZmZmZlwiKTtcclxuICAgIGRldmljZUlkVGV4dEZpZWxkLmNvbG9yID0gbWFpblRleHRDb2xvcjtcclxuICAgIGxldCBoaW50Q29sb3IgPSBuZXcgQ29sb3IoXCIjZmZmZmZmXCIpO1xyXG4gICAgc2V0SGludENvbG9yKHsgdmlldzogZGV2aWNlSWRUZXh0RmllbGQsIGNvbG9yOiBoaW50Q29sb3IgfSk7XHJcbiAgfVxyXG59Il19