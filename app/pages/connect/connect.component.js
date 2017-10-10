"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var color_1 = require("color");
var hint_util_1 = require("../../utils/hint-util");
var bluetooth_device_1 = require("../../shared/bluetooth/bluetooth-device");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var modal_view_component_1 = require("../../pages/modal-view/modal-view.component");
var configuration_1 = require("../../shared/configuration/configuration");
var nativescript_sidedrawer_1 = require("nativescript-sidedrawer");
var applicationSettings = require("tns-core-modules/application-settings");
var animation = require("tns-core-modules/ui/animation");
var Toast = require("nativescript-toast");
var bluetooth = require("nativescript-bluetooth");
var router_1 = require("nativescript-angular/router");
var he = require('he');
var imageSource = require("image-source");
var timer = require("timer");
var ConnectComponent = (function () {
    function ConnectComponent(page, modalService, vcRef, routerExtensions) {
        this.page = page;
        this.modalService = modalService;
        this.vcRef = vcRef;
        this.routerExtensions = routerExtensions;
        this.isLoggingIn = true;
        this.isConnected = false;
        this.device = new bluetooth_device_1.BluetoothDevice();
        this.device.isConnected = false;
        this.device.UUID = "30:AE:A4:18:1B:16";
        this.config = new configuration_1.ConfigurationModel();
    }
    ConnectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.config.wifi_ssid = applicationSettings.getString("wifiSSID");
        this.config.wifi_password = applicationSettings.getString("wifiPassword");
        this.config.licence_number = applicationSettings.getString("licenceNumber");
        if (!this.config.licence_number) {
            this.routerExtensions.navigate(["/register"], { clearHistory: true });
        }
        else if (!this.config.wifi_ssid) {
            this.routerExtensions.navigate(["/configuration"], { clearHistory: true });
        }
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
                        Toast.makeText("Cannot use the application without bluetooth", "long").show();
                    }
                });
            }
        });
    };
    ConnectComponent.prototype.openDrawer = function () {
        nativescript_sidedrawer_1.TnsSideDrawer.toggle();
        // this.routerExtensions.navigate(["/configuration"], { clearHistory: true });
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
    core_1.ViewChild("deviceid"),
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
    __metadata("design:paramtypes", [page_1.Page,
        modal_dialog_1.ModalDialogService,
        core_1.ViewContainerRef,
        router_1.RouterExtensions])
], ConnectComponent);
exports.ConnectComponent = ConnectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUMzRixnQ0FBK0I7QUFDL0IsK0JBQThCO0FBQzlCLG1EQUFxRDtBQUdyRCw0RUFBMEU7QUFDMUUsa0VBQTJGO0FBQzNGLG9GQUFpRjtBQUNqRiwwRUFBOEU7QUFDOUUsbUVBQXdEO0FBRXhELDJFQUE2RTtBQUM3RSx5REFBMkQ7QUFDM0QsMENBQTRDO0FBQzVDLGtEQUFxRDtBQUdyRCxzREFBK0Q7QUFDL0QsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXZCLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFTN0IsSUFBYSxnQkFBZ0I7SUFXM0IsMEJBQW9CLElBQVUsRUFDbEIsWUFBZ0MsRUFDaEMsS0FBdUIsRUFDdkIsZ0JBQWtDO1FBSDFCLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEIsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFaOUMsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFhbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFlLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUM7UUFFdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFrQixFQUFFLENBQUM7SUFFekMsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxp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QUFRLENBQUMsYUFBYSxDQUFDO1FBRS9ELElBQUksYUFBYSxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7UUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsd0JBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBbE9ELElBa09DO0FBM05vQjtJQUFsQixnQkFBUyxDQUFDLE1BQU0sQ0FBQzs4QkFBTyxpQkFBVTs4Q0FBQztBQUNUO0lBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDOzhCQUFlLGlCQUFVO3NEQUFDO0FBQzdCO0lBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDOzhCQUFXLGlCQUFVO2tEQUFDO0FBVGpDLGdCQUFnQjtJQVA1QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsU0FBUyxFQUFFLENBQUMsaUNBQWtCLENBQUM7UUFDL0IsZUFBZSxFQUFFLENBQUMseUNBQWtCLENBQUM7UUFDckMsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSwyQkFBMkIsQ0FBQztLQUM3RSxDQUFDO3FDQVkwQixXQUFJO1FBQ0osaUNBQWtCO1FBQ3pCLHVCQUFnQjtRQUNMLHlCQUFnQjtHQWRuQyxnQkFBZ0IsQ0FrTzVCO0FBbE9ZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XHJcbmltcG9ydCB7IHNldEhpbnRDb2xvciB9IGZyb20gXCIuLi8uLi91dGlscy9oaW50LXV0aWxcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIjtcclxuaW1wb3J0IHsgQmx1ZXRvb3RoRGV2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9ibHVldG9vdGgvYmx1ZXRvb3RoLWRldmljZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UsIE1vZGFsRGlhbG9nT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuaW1wb3J0IHsgTW9kYWxWaWV3Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3BhZ2VzL21vZGFsLXZpZXcvbW9kYWwtdmlldy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbk1vZGVsIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb25cIjtcclxuaW1wb3J0IHsgVG5zU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc2lkZWRyYXdlclwiO1xyXG5cclxuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgKiBhcyBhbmltYXRpb24gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYW5pbWF0aW9uXCI7XHJcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gXCJuYXRpdmVzY3JpcHQtdG9hc3RcIjtcclxuaW1wb3J0IGJsdWV0b290aCA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1ibHVldG9vdGgnKTtcclxuaW1wb3J0ICogYXMgdXRmOCBmcm9tIFwidXRmOFwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xyXG52YXIgaGUgPSByZXF1aXJlKCdoZScpO1xyXG5cclxuY29uc3QgaW1hZ2VTb3VyY2UgPSByZXF1aXJlKFwiaW1hZ2Utc291cmNlXCIpO1xyXG52YXIgdGltZXIgPSByZXF1aXJlKFwidGltZXJcIik7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJteS1hcHBcIixcclxuICBwcm92aWRlcnM6IFtNb2RhbERpYWxvZ1NlcnZpY2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW01vZGFsVmlld0NvbXBvbmVudF0sXHJcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvY29ubmVjdC9jb25uZWN0Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2Nvbm5lY3QvY29ubmVjdC1jb21tb24uY3NzXCIsIFwicGFnZXMvY29ubmVjdC9jb25uZWN0LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29ubmVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgY29uZmlnOiBDb25maWd1cmF0aW9uTW9kZWw7XHJcbiAgaXNMb2dnaW5nSW4gPSB0cnVlO1xyXG4gIGlzQ29ubmVjdGVkID0gZmFsc2U7XHJcbiAgYW5pbWF0aW9uU2V0OiBhbmltYXRpb24uQW5pbWF0aW9uO1xyXG4gIGRldmljZTogQmx1ZXRvb3RoRGV2aWNlO1xyXG5cclxuICBAVmlld0NoaWxkKFwid2lmaVwiKSB3aWZpOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJ3aWZpaW5hY3RpdmVcIikgd2lmaWluYWN0aXZlOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJkZXZpY2VpZFwiKSBkZXZpY2VJZDogRWxlbWVudFJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBcclxuICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsRGlhbG9nU2VydmljZSwgXHJcbiAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsIFxyXG4gICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIFxyXG4gIHtcclxuICAgIHRoaXMuZGV2aWNlID0gbmV3IEJsdWV0b290aERldmljZSgpO1xyXG4gICAgdGhpcy5kZXZpY2UuaXNDb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZGV2aWNlLlVVSUQgPSBcIjMwOkFFOkE0OjE4OjFCOjE2XCI7XHJcblxyXG4gICAgdGhpcy5jb25maWcgPSBuZXcgQ29uZmlndXJhdGlvbk1vZGVsKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbmZpZy53aWZpX3NzaWQgPSBhcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIndpZmlTU0lEXCIpO1xyXG4gICAgdGhpcy5jb25maWcud2lmaV9wYXNzd29yZCA9IGFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwid2lmaVBhc3N3b3JkXCIpO1xyXG4gICAgdGhpcy5jb25maWcubGljZW5jZV9udW1iZXIgPSBhcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcImxpY2VuY2VOdW1iZXJcIik7XHJcblxyXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5saWNlbmNlX251bWJlcikge1xyXG4gICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3JlZ2lzdGVyXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMuY29uZmlnLndpZmlfc3NpZCkge1xyXG4gICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NvbmZpZ3VyYXRpb25cIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSBmYWxzZTtcclxuICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjNEUyQzUyXCIpO1xyXG5cclxuICAgIHRoaXMuc2V0VGV4dEZpZWxkQ29sb3IoKTtcclxuXHJcbiAgICBjb25zdCBpbWcgPSBpbWFnZVNvdXJjZS5mcm9tUmVzb3VyY2UoXCJ3aWZpX2luYWN0aWZcIik7XHJcblxyXG4gICAgdGhpcy5ibHVldG9vdGhFbmFibGVkKClcclxuICAgICAgLnRoZW4oXHJcbiAgICAgICAgKGVuYWJsZWQpID0+IHtcclxuICAgICAgICAgIGlmIChlbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmx1ZXRvb3RoIGVuYWJsZWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UGVybWlzc2lvbigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9Fc3AoXCIzMDpBRTpBNDoxODoxQjoxNlwiKTsgICAgICAgICAgICBcclxuICAgICAgICAgIH0gXHJcbiAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBibHVldG9vdGguZW5hYmxlKCkudGhlbihcclxuICAgICAgICAgICAgICAoZW5hYmxlZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCbHVldG9vdGggZW5hYmxlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQZXJtaXNzaW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb0VzcChcIjMwOkFFOkE0OjE4OjFCOjE2XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7ICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIFRvYXN0Lm1ha2VUZXh0KFwiQ2Fubm90IHVzZSB0aGUgYXBwbGljYXRpb24gd2l0aG91dCBibHVldG9vdGhcIiwgXCJsb25nXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgKSAgXHJcbiAgfVxyXG5cclxuICBvcGVuRHJhd2VyKCkge1xyXG4gICAgVG5zU2lkZURyYXdlci50b2dnbGUoKTtcclxuICAgIC8vIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY29uZmlndXJhdGlvblwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgfVxyXG5cclxuICBzYXZlVGFibGVOdW1iZXIoKSB7XHJcbiAgICBpZiAodGhpcy5kZXZpY2UuaXNDb25uZWN0ZWQpIHtcclxuICAgICAgaWYgKHRoaXMuZGV2aWNlLnRhYmxlTnVtYmVyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJEZXZpY2UgTmFtZTogXCIgKyB0aGlzLmRldmljZS5uYW1lKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkRldmljZSBVVUlEOiBcIiArIHRoaXMuZGV2aWNlLlVVSUQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGFibGUgTnVtYmVyOiBcIiArIHRoaXMuZGV2aWNlLnRhYmxlTnVtYmVyKTtcclxuICAgICAgICB0aGlzLndyaXRlVGFibGVOdW1iZXIodGhpcy5kZXZpY2UudGFibGVOdW1iZXIsIHRoaXMuZGV2aWNlLlVVSUQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgIC8vICAgdGl0bGU6IFwiVGFibGUgbnVtYmVyIGVtcHR5XCIsXHJcbiAgICAgICAgLy8gICBtZXNzYWdlOiBcIlBsZWFzZSBlbnRlciB0aGUgdGFibGUgbnVtYmVyXCIsXHJcbiAgICAgICAgLy8gICBva0J1dHRvblRleHQ6IFwiT2tcIlxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTW9kYWxWaWV3KFwiVGFibGUgbnVtYmVyIGVtcHR5XCIsIFwiUGxlYXNlIGVudGVyIHRoZSB0YWJsZSBudW1iZXJcIilcclxuICAgICAgICAgIC50aGVuKClcclxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICBhbGVydChcIk5vIGRldmljZXMgY29ubmVjdGVkXCIpO1xyXG4gICAgICB0aGlzLmNvbm5lY3RUb0VzcCh0aGlzLmRldmljZS5VVUlEKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJsdWV0b290aEVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gYmx1ZXRvb3RoLmlzQmx1ZXRvb3RoRW5hYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGVybWlzc2lvbigpIHtcclxuICAgICAgYmx1ZXRvb3RoLmhhc0NvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAudGhlbigoZ3JhbnRlZCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghZ3JhbnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICBibHVldG9vdGgucmVxdWVzdENvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIHBlcm1pc3Npb24gcmVxdWVzdGVkXCIpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVybWlzc2lvbiBncmFudGVkXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdFRvRXNwKGlkOiBzdHJpbmcpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJUcnlpbmcgdG8gY29ubmVjdCB3aXRoOiBcIiArIGlkKTtcclxuICAgICAgYmx1ZXRvb3RoLmNvbm5lY3Qoe1xyXG4gICAgICAgICAgVVVJRDogaWQsXHJcbiAgICAgICAgICBvbkNvbm5lY3RlZDogKHBlcmlwaGVyYWwpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkOiAnICsgcGVyaXBoZXJhbC5uYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLmRldmljZS5pc0Nvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgdGhpcy5kZXZpY2UubmFtZSA9IHBlcmlwaGVyYWwubmFtZTtcclxuICAgICAgICAgICAgICAvLyBwZXJpcGhlcmFsLnNlcnZpY2VzLmZvckVhY2goKHNlcnZpY2UpID0+IHtcclxuICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwic2VydmljZSBmb3VuZDogXCIgKyBKU09OLnN0cmluZ2lmeShzZXJ2aWNlKSlcclxuICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIHRoaXMud3JpdGVUYWJsZU51bWJlcih0aGlzLmRldmljZS50YWJsZV9udW1iZXIsIGlkKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvbkRpc2Nvbm5lY3RlZDogKHBlcmlwaGVyYWwpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRGlzY29ubmVjdGVkOiAnICsgcGVyaXBoZXJhbC5uYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb0VzcChpZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVUYWJsZU51bWJlcihudW1iZXI6IHN0cmluZywgaWQ6IHN0cmluZykge1xyXG4gICAgICAvLyBsZXQgZW5jb2RlZFN0cmluZyA9IGVuY29kZXIuZW5jb2RlKFwidGVzdFwiKTtcclxuICAgICAgbGV0IHV0ZlN0cmluZyA9IGhlLmVuY29kZShudW1iZXIsIHsnZW5jb2RlRXZlcnl0aGluZyc6IHRydWV9KTtcclxuICAgICAgdXRmU3RyaW5nID0gdXRmU3RyaW5nLnJlcGxhY2UobmV3IFJlZ0V4cCgnOycsJ2cnKSwgXCIsXCIpO1xyXG4gICAgICB1dGZTdHJpbmcgPSB1dGZTdHJpbmcucmVwbGFjZShuZXcgUmVnRXhwKCcmIycsJ2cnKSwgXCIwXCIpO1xyXG4gICAgICAvLyB1dGZTdHJpbmcgPSB1dGZTdHJpbmcuc3Vic3RyaW5nKDAsIHV0ZlN0cmluZy5sZW5naHQgLSAxKTtcclxuICAgICAgLy8gbGV0IHV0ZlN0cmluZyA9IHV0ZjguZGVjb2RlKFwiXFx4NzRcXHg2NVxceDczXFx4NzRcIik7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGhlLmVuY29kZShcInRlc3RcIiwgeydlbmNvZGVFdmVyeXRoaW5nJzogdHJ1ZX0pKTtcclxuICAgICAgY29uc29sZS5sb2codXRmU3RyaW5nKTsgIFxyXG5cclxuICAgICAgYmx1ZXRvb3RoLndyaXRlKHtcclxuICAgICAgICBwZXJpcGhlcmFsVVVJRDogaWQsXHJcbiAgICAgICAgc2VydmljZVVVSUQ6IFwiMDBmZlwiLFxyXG4gICAgICAgIGNoYXJhY3RlcmlzdGljVVVJRDogXCJmZjAxXCIsXHJcbiAgICAgICAgdmFsdWU6IHV0ZlN0cmluZ1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVNb2RhbFZpZXcoXCJTdWNjZXNzICEhXCIsIFwiVGFibGUgbnVtYmVyIHNhdmVkXCIpXHJcbiAgICAgICAgLnRoZW4oKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVNb2RhbFZpZXcoXCJFcnJvclwiLCBlcnIpXHJcbiAgICAgICAgLnRoZW4oKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgY2hhbmdlSW1hZ2UoKSB7XHJcbiAgICBsZXQgd2lmaUltYWdlID0gPEltYWdlPnRoaXMud2lmaS5uYXRpdmVFbGVtZW50O1xyXG4gICAgbGV0IHdpZmlJbmFjdGl2ZUltYWdlID0gPEltYWdlPnRoaXMud2lmaWluYWN0aXZlLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5hbmltYXRpb25TZXQgPSBuZXcgYW5pbWF0aW9uLkFuaW1hdGlvbihbe1xyXG4gICAgICB0YXJnZXQ6IHdpZmlJbWFnZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgIGl0ZXJhdGlvbnM6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcclxuICAgICAgXHJcbiAgICB9XSk7XHJcbiAgICB0aGlzLmFuaW1hdGlvblNldC5wbGF5KCkuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFuaW1hdGlvbiBzdG9wcGVkIVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGFuaW1hdGlvbkluYWN0aXZlID0gbmV3IGFuaW1hdGlvbi5BbmltYXRpb24oW3tcclxuICAgICAgdGFyZ2V0OiB3aWZpSW5hY3RpdmVJbWFnZSxcclxuICAgICAgb3BhY2l0eTogMTAwLFxyXG4gICAgICBkdXJhdGlvbjogMjAwMCxcclxuICAgICAgaXRlcmF0aW9uczogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLFxyXG4gICAgICBcclxuICAgIH1dKTtcclxuICAgIGFuaW1hdGlvbkluYWN0aXZlLnBsYXkoKS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQW5pbWF0aW9uIHN0b3BwZWQhXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU1vZGFsVmlldyh0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xyXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxyXG4gICAgICBjb250ZXh0OiB7dGl0bGU6IHRpdGxlLCBtZXNzYWdlOiBtZXNzYWdlfSxcclxuICAgICAgZnVsbHNjcmVlbjogZmFsc2UsICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxWaWV3Q29tcG9uZW50LCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSkge1xyXG4gICAgYWxlcnQoXCJFcnJvcjogXCIgKyBlcnJvcik7XHJcbiAgICBjb25zb2xlLmRpcihlcnJvcik7XHJcbiAgfVxyXG5cclxuICBzZXRUZXh0RmllbGRDb2xvcigpIHtcclxuICAgIGxldCBkZXZpY2VJZFRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5kZXZpY2VJZC5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgIGxldCBtYWluVGV4dENvbG9yID0gbmV3IENvbG9yKFwiI2ZmZmZmZlwiKTtcclxuICAgIGRldmljZUlkVGV4dEZpZWxkLmNvbG9yID0gbWFpblRleHRDb2xvcjtcclxuICAgIGxldCBoaW50Q29sb3IgPSBuZXcgQ29sb3IoXCIjZmZmZmZmXCIpO1xyXG4gICAgc2V0SGludENvbG9yKHsgdmlldzogZGV2aWNlSWRUZXh0RmllbGQsIGNvbG9yOiBoaW50Q29sb3IgfSk7XHJcbiAgfVxyXG59Il19