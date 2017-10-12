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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUMzRixnQ0FBK0I7QUFDL0IsK0JBQThCO0FBQzlCLG1EQUFxRDtBQUdyRCw0RUFBMEU7QUFDMUUsa0VBQTJGO0FBQzNGLG9GQUFpRjtBQUNqRiwwRUFBOEU7QUFDOUUsbUVBQXdEO0FBRXhELDJFQUE2RTtBQUM3RSx5REFBMkQ7QUFDM0QsMENBQTRDO0FBQzVDLGtEQUFxRDtBQUdyRCxzREFBK0Q7QUFDL0QsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXZCLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFTN0IsSUFBYSxnQkFBZ0I7SUFXM0IsMEJBQW9CLElBQVUsRUFDbEIsWUFBZ0MsRUFDaEMsS0FBdUIsRUFDdkIsZ0JBQWtDO1FBSDFCLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEIsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFaOUMsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFhbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFlLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUM7UUFFdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFrQixFQUFFLENBQUM7SUFFekMsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxp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QUFRLENBQUMsYUFBYSxDQUFDO1FBRS9ELElBQUksYUFBYSxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7UUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsd0JBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBbE9ELElBa09DO0FBM05vQjtJQUFsQixnQkFBUyxDQUFDLE1BQU0sQ0FBQzs4QkFBTyxpQkFBVTs4Q0FBQztBQUNUO0lBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDOzhCQUFlLGlCQUFVO3NEQUFDO0FBQzdCO0lBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDOzhCQUFXLGlCQUFVO2tEQUFDO0FBVGpDLGdCQUFnQjtJQVA1QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsU0FBUyxFQUFFLENBQUMsaUNBQWtCLENBQUM7UUFDL0IsZUFBZSxFQUFFLENBQUMseUNBQWtCLENBQUM7UUFDckMsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSwyQkFBMkIsQ0FBQztLQUM3RSxDQUFDO3FDQVkwQixXQUFJO1FBQ0osaUNBQWtCO1FBQ3pCLHVCQUFnQjtRQUNMLHlCQUFnQjtHQWRuQyxnQkFBZ0IsQ0FrTzVCO0FBbE9ZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcbmltcG9ydCB7IHNldEhpbnRDb2xvciB9IGZyb20gXCIuLi8uLi91dGlscy9oaW50LXV0aWxcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xuaW1wb3J0IHsgQmx1ZXRvb3RoRGV2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9ibHVldG9vdGgvYmx1ZXRvb3RoLWRldmljZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlLCBNb2RhbERpYWxvZ09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBNb2RhbFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vcGFnZXMvbW9kYWwtdmlldy9tb2RhbC12aWV3LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbk1vZGVsIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IFRuc1NpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNpZGVkcmF3ZXJcIjtcblxuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgYW5pbWF0aW9uIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FuaW1hdGlvblwiO1xuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSBcIm5hdGl2ZXNjcmlwdC10b2FzdFwiO1xuaW1wb3J0IGJsdWV0b290aCA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1ibHVldG9vdGgnKTtcbmltcG9ydCAqIGFzIHV0ZjggZnJvbSBcInV0ZjhcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xudmFyIGhlID0gcmVxdWlyZSgnaGUnKTtcblxuY29uc3QgaW1hZ2VTb3VyY2UgPSByZXF1aXJlKFwiaW1hZ2Utc291cmNlXCIpO1xudmFyIHRpbWVyID0gcmVxdWlyZShcInRpbWVyXCIpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHByb3ZpZGVyczogW01vZGFsRGlhbG9nU2VydmljZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW01vZGFsVmlld0NvbXBvbmVudF0sXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2Nvbm5lY3QvY29ubmVjdC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvY29ubmVjdC9jb25uZWN0LWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9jb25uZWN0L2Nvbm5lY3QuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIENvbm5lY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25maWc6IENvbmZpZ3VyYXRpb25Nb2RlbDtcbiAgaXNMb2dnaW5nSW4gPSB0cnVlO1xuICBpc0Nvbm5lY3RlZCA9IGZhbHNlO1xuICBhbmltYXRpb25TZXQ6IGFuaW1hdGlvbi5BbmltYXRpb247XG4gIGRldmljZTogQmx1ZXRvb3RoRGV2aWNlO1xuXG4gIEBWaWV3Q2hpbGQoXCJ3aWZpXCIpIHdpZmk6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJ3aWZpaW5hY3RpdmVcIikgd2lmaWluYWN0aXZlOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiZGV2aWNlaWRcIikgZGV2aWNlSWQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBcbiAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsIFxuICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgXG4gICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIFxuICB7XG4gICAgdGhpcy5kZXZpY2UgPSBuZXcgQmx1ZXRvb3RoRGV2aWNlKCk7XG4gICAgdGhpcy5kZXZpY2UuaXNDb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRldmljZS5VVUlEID0gXCIzMDpBRTpBNDoxODoxQjoxNlwiO1xuXG4gICAgdGhpcy5jb25maWcgPSBuZXcgQ29uZmlndXJhdGlvbk1vZGVsKCk7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29uZmlnLndpZmlfc3NpZCA9IGFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwid2lmaVNTSURcIik7XG4gICAgdGhpcy5jb25maWcud2lmaV9wYXNzd29yZCA9IGFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwid2lmaVBhc3N3b3JkXCIpO1xuICAgIHRoaXMuY29uZmlnLmxpY2VuY2VfbnVtYmVyID0gYXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJsaWNlbmNlTnVtYmVyXCIpO1xuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5saWNlbmNlX251bWJlcikge1xuICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9yZWdpc3RlclwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5jb25maWcud2lmaV9zc2lkKSB7XG4gICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NvbmZpZ3VyYXRpb25cIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSBmYWxzZTtcbiAgICB0aGlzLnBhZ2UuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKFwiIzRFMkM1MlwiKTtcblxuICAgIHRoaXMuc2V0VGV4dEZpZWxkQ29sb3IoKTtcblxuICAgIGNvbnN0IGltZyA9IGltYWdlU291cmNlLmZyb21SZXNvdXJjZShcIndpZmlfaW5hY3RpZlwiKTtcblxuICAgIHRoaXMuYmx1ZXRvb3RoRW5hYmxlZCgpXG4gICAgICAudGhlbihcbiAgICAgICAgKGVuYWJsZWQpID0+IHtcbiAgICAgICAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCbHVldG9vdGggZW5hYmxlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0UGVybWlzc2lvbigpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RUb0VzcChcIjMwOkFFOkE0OjE4OjFCOjE2XCIpOyAgICAgICAgICAgIFxuICAgICAgICAgIH0gXG4gICAgICAgICAgZWxzZSBcbiAgICAgICAgICB7XG4gICAgICAgICAgICBibHVldG9vdGguZW5hYmxlKCkudGhlbihcbiAgICAgICAgICAgICAgKGVuYWJsZWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCbHVldG9vdGggZW5hYmxlZFwiKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGVybWlzc2lvbigpO1xuXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb0VzcChcIjMwOkFFOkE0OjE4OjFCOjE2XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIFRvYXN0Lm1ha2VUZXh0KFwiQ2Fubm90IHVzZSB0aGUgYXBwbGljYXRpb24gd2l0aG91dCBibHVldG9vdGhcIiwgXCJsb25nXCIpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICkgIFxuICB9XG5cbiAgb3BlbkRyYXdlcigpIHtcbiAgICBUbnNTaWRlRHJhd2VyLnRvZ2dsZSgpO1xuICAgIC8vIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY29uZmlndXJhdGlvblwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gIH1cblxuICBzYXZlVGFibGVOdW1iZXIoKSB7XG4gICAgaWYgKHRoaXMuZGV2aWNlLmlzQ29ubmVjdGVkKSB7XG4gICAgICBpZiAodGhpcy5kZXZpY2UudGFibGVOdW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJEZXZpY2UgTmFtZTogXCIgKyB0aGlzLmRldmljZS5uYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJEZXZpY2UgVVVJRDogXCIgKyB0aGlzLmRldmljZS5VVUlEKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJUYWJsZSBOdW1iZXI6IFwiICsgdGhpcy5kZXZpY2UudGFibGVOdW1iZXIpO1xuICAgICAgICB0aGlzLndyaXRlVGFibGVOdW1iZXIodGhpcy5kZXZpY2UudGFibGVOdW1iZXIsIHRoaXMuZGV2aWNlLlVVSUQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGlhbG9ncy5hbGVydCh7XG4gICAgICAgIC8vICAgdGl0bGU6IFwiVGFibGUgbnVtYmVyIGVtcHR5XCIsXG4gICAgICAgIC8vICAgbWVzc2FnZTogXCJQbGVhc2UgZW50ZXIgdGhlIHRhYmxlIG51bWJlclwiLFxuICAgICAgICAvLyAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgIC8vIH0pO1xuICAgICAgICB0aGlzLmNyZWF0ZU1vZGFsVmlldyhcIlRhYmxlIG51bWJlciBlbXB0eVwiLCBcIlBsZWFzZSBlbnRlciB0aGUgdGFibGUgbnVtYmVyXCIpXG4gICAgICAgICAgLnRoZW4oKVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBcbiAgICBlbHNlXG4gICAge1xuICAgICAgYWxlcnQoXCJObyBkZXZpY2VzIGNvbm5lY3RlZFwiKTtcbiAgICAgIHRoaXMuY29ubmVjdFRvRXNwKHRoaXMuZGV2aWNlLlVVSUQpO1xuICAgIH1cbiAgfVxuXG4gIGJsdWV0b290aEVuYWJsZWQoKSB7XG4gICAgcmV0dXJuIGJsdWV0b290aC5pc0JsdWV0b290aEVuYWJsZWQoKTtcbiAgfVxuXG4gIGdldFBlcm1pc3Npb24oKSB7XG4gICAgICBibHVldG9vdGguaGFzQ29hcnNlTG9jYXRpb25QZXJtaXNzaW9uKClcbiAgICAgICAgICAudGhlbigoZ3JhbnRlZCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWdyYW50ZWQpIHtcbiAgICAgICAgICAgICAgICAgIGJsdWV0b290aC5yZXF1ZXN0Q29hcnNlTG9jYXRpb25QZXJtaXNzaW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIHBlcm1pc3Npb24gcmVxdWVzdGVkXCIpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVybWlzc2lvbiBncmFudGVkXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gIH1cblxuICBjb25uZWN0VG9Fc3AoaWQ6IHN0cmluZykge1xuICAgICAgY29uc29sZS5sb2coXCJUcnlpbmcgdG8gY29ubmVjdCB3aXRoOiBcIiArIGlkKTtcbiAgICAgIGJsdWV0b290aC5jb25uZWN0KHtcbiAgICAgICAgICBVVUlEOiBpZCxcbiAgICAgICAgICBvbkNvbm5lY3RlZDogKHBlcmlwaGVyYWwpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZDogJyArIHBlcmlwaGVyYWwubmFtZSk7XG4gICAgICAgICAgICAgIHRoaXMuZGV2aWNlLmlzQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy5kZXZpY2UubmFtZSA9IHBlcmlwaGVyYWwubmFtZTtcbiAgICAgICAgICAgICAgLy8gcGVyaXBoZXJhbC5zZXJ2aWNlcy5mb3JFYWNoKChzZXJ2aWNlKSA9PiB7XG4gICAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2coXCJzZXJ2aWNlIGZvdW5kOiBcIiArIEpTT04uc3RyaW5naWZ5KHNlcnZpY2UpKVxuICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSgpO1xuXG4gICAgICAgICAgICAgIC8vIHRoaXMud3JpdGVUYWJsZU51bWJlcih0aGlzLmRldmljZS50YWJsZV9udW1iZXIsIGlkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRGlzY29ubmVjdGVkOiAocGVyaXBoZXJhbCkgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRGlzY29ubmVjdGVkOiAnICsgcGVyaXBoZXJhbC5uYW1lKTtcbiAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9Fc3AoaWQpO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgd3JpdGVUYWJsZU51bWJlcihudW1iZXI6IHN0cmluZywgaWQ6IHN0cmluZykge1xuICAgICAgLy8gbGV0IGVuY29kZWRTdHJpbmcgPSBlbmNvZGVyLmVuY29kZShcInRlc3RcIik7XG4gICAgICBsZXQgdXRmU3RyaW5nID0gaGUuZW5jb2RlKG51bWJlciwgeydlbmNvZGVFdmVyeXRoaW5nJzogdHJ1ZX0pO1xuICAgICAgdXRmU3RyaW5nID0gdXRmU3RyaW5nLnJlcGxhY2UobmV3IFJlZ0V4cCgnOycsJ2cnKSwgXCIsXCIpO1xuICAgICAgdXRmU3RyaW5nID0gdXRmU3RyaW5nLnJlcGxhY2UobmV3IFJlZ0V4cCgnJiMnLCdnJyksIFwiMFwiKTtcbiAgICAgIC8vIHV0ZlN0cmluZyA9IHV0ZlN0cmluZy5zdWJzdHJpbmcoMCwgdXRmU3RyaW5nLmxlbmdodCAtIDEpO1xuICAgICAgLy8gbGV0IHV0ZlN0cmluZyA9IHV0ZjguZGVjb2RlKFwiXFx4NzRcXHg2NVxceDczXFx4NzRcIik7XG4gICAgICAvLyBjb25zb2xlLmxvZyhoZS5lbmNvZGUoXCJ0ZXN0XCIsIHsnZW5jb2RlRXZlcnl0aGluZyc6IHRydWV9KSk7XG4gICAgICBjb25zb2xlLmxvZyh1dGZTdHJpbmcpOyAgXG5cbiAgICAgIGJsdWV0b290aC53cml0ZSh7XG4gICAgICAgIHBlcmlwaGVyYWxVVUlEOiBpZCxcbiAgICAgICAgc2VydmljZVVVSUQ6IFwiMDBmZlwiLFxuICAgICAgICBjaGFyYWN0ZXJpc3RpY1VVSUQ6IFwiZmYwMVwiLFxuICAgICAgICB2YWx1ZTogdXRmU3RyaW5nXG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmNyZWF0ZU1vZGFsVmlldyhcIlN1Y2Nlc3MgISFcIiwgXCJUYWJsZSBudW1iZXIgc2F2ZWRcIilcbiAgICAgICAgLnRoZW4oKVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgdGhpcy5jcmVhdGVNb2RhbFZpZXcoXCJFcnJvclwiLCBlcnIpXG4gICAgICAgIC50aGVuKClcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBcbiAgY2hhbmdlSW1hZ2UoKSB7XG4gICAgbGV0IHdpZmlJbWFnZSA9IDxJbWFnZT50aGlzLndpZmkubmF0aXZlRWxlbWVudDtcbiAgICBsZXQgd2lmaUluYWN0aXZlSW1hZ2UgPSA8SW1hZ2U+dGhpcy53aWZpaW5hY3RpdmUubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuYW5pbWF0aW9uU2V0ID0gbmV3IGFuaW1hdGlvbi5BbmltYXRpb24oW3tcbiAgICAgIHRhcmdldDogd2lmaUltYWdlLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgaXRlcmF0aW9uczogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLFxuICAgICAgXG4gICAgfV0pO1xuICAgIHRoaXMuYW5pbWF0aW9uU2V0LnBsYXkoKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFuaW1hdGlvbiBzdG9wcGVkIVwiKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGFuaW1hdGlvbkluYWN0aXZlID0gbmV3IGFuaW1hdGlvbi5BbmltYXRpb24oW3tcbiAgICAgIHRhcmdldDogd2lmaUluYWN0aXZlSW1hZ2UsXG4gICAgICBvcGFjaXR5OiAxMDAsXG4gICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgIGl0ZXJhdGlvbnM6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgICAgIFxuICAgIH1dKTtcbiAgICBhbmltYXRpb25JbmFjdGl2ZS5wbGF5KCkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJBbmltYXRpb24gc3RvcHBlZCFcIik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1vZGFsVmlldyh0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXG4gICAgICBjb250ZXh0OiB7dGl0bGU6IHRpdGxlLCBtZXNzYWdlOiBtZXNzYWdlfSxcbiAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLCAgICAgIFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKE1vZGFsVmlld0NvbXBvbmVudCwgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHtcbiAgICBhbGVydChcIkVycm9yOiBcIiArIGVycm9yKTtcbiAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gIH1cblxuICBzZXRUZXh0RmllbGRDb2xvcigpIHtcbiAgICBsZXQgZGV2aWNlSWRUZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMuZGV2aWNlSWQubmF0aXZlRWxlbWVudDtcblxuICAgIGxldCBtYWluVGV4dENvbG9yID0gbmV3IENvbG9yKFwiI2ZmZmZmZlwiKTtcbiAgICBkZXZpY2VJZFRleHRGaWVsZC5jb2xvciA9IG1haW5UZXh0Q29sb3I7XG4gICAgbGV0IGhpbnRDb2xvciA9IG5ldyBDb2xvcihcIiNmZmZmZmZcIik7XG4gICAgc2V0SGludENvbG9yKHsgdmlldzogZGV2aWNlSWRUZXh0RmllbGQsIGNvbG9yOiBoaW50Q29sb3IgfSk7XG4gIH1cbn0iXX0=