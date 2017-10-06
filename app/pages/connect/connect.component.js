"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var color_1 = require("color");
var bluetooth_device_1 = require("../../shared/bluetooth/bluetooth-device");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var modal_view_component_1 = require("../../pages/modal-view/modal-view.component");
var animation = require("tns-core-modules/ui/animation");
var bluetooth = require("nativescript-bluetooth");
var he = require('he');
var imageSource = require("image-source");
var timer = require("timer");
var ConnectComponent = (function () {
    function ConnectComponent(page, modalService, vcRef) {
        this.page = page;
        this.modalService = modalService;
        this.vcRef = vcRef;
        this.isLoggingIn = true;
        this.isConnected = false;
        this.device = new bluetooth_device_1.BluetoothDevice();
        this.device.isConnected = false;
        this.device.UUID = "30:AE:A4:18:1B:16";
    }
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
        providers: [modal_dialog_1.ModalDialogService],
        entryComponents: [modal_view_component_1.ModalViewComponent],
        templateUrl: "pages/connect/connect.html",
        styleUrls: ["pages/connect/connect-common.css", "pages/connect/connect.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page, modal_dialog_1.ModalDialogService, core_1.ViewContainerRef])
], ConnectComponent);
exports.ConnectComponent = ConnectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUMzRixnQ0FBK0I7QUFDL0IsK0JBQThCO0FBSTlCLDRFQUEwRTtBQUMxRSxrRUFBMkY7QUFDM0Ysb0ZBQWlGO0FBRWpGLHlEQUEyRDtBQUMzRCxrREFBcUQ7QUFHckQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXZCLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFTN0IsSUFBYSxnQkFBZ0I7SUFTM0IsMEJBQW9CLElBQVUsRUFBVSxZQUFnQyxFQUFVLEtBQXVCO1FBQXJGLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQVJ6RyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQVFsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksa0NBQWUsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQztJQUN6QyxDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUFBLGlCQWtDQztRQWpDQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakQsSUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztR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QXpMb0I7SUFBbEIsZ0JBQVMsQ0FBQyxNQUFNLENBQUM7OEJBQU8saUJBQVU7OENBQUM7QUFDVDtJQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQzs4QkFBZSxpQkFBVTtzREFBQztBQVB6QyxnQkFBZ0I7SUFQNUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFNBQVMsRUFBRSxDQUFDLGlDQUFrQixDQUFDO1FBQy9CLGVBQWUsRUFBRSxDQUFDLHlDQUFrQixDQUFDO1FBQ3JDLFdBQVcsRUFBRSw0QkFBNEI7UUFDekMsU0FBUyxFQUFFLENBQUMsa0NBQWtDLEVBQUUsMkJBQTJCLENBQUM7S0FDN0UsQ0FBQztxQ0FVMEIsV0FBSSxFQUF3QixpQ0FBa0IsRUFBaUIsdUJBQWdCO0dBVDlGLGdCQUFnQixDQStMNUI7QUEvTFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuaW1wb3J0IHsgc2V0SGludENvbG9yIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2hpbnQtdXRpbFwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xyXG5pbXBvcnQgeyBCbHVldG9vdGhEZXZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2JsdWV0b290aC9ibHVldG9vdGgtZGV2aWNlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBNb2RhbFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vcGFnZXMvbW9kYWwtdmlldy9tb2RhbC12aWV3LmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0ICogYXMgYW5pbWF0aW9uIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQgYmx1ZXRvb3RoID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWJsdWV0b290aCcpO1xyXG5pbXBvcnQgKiBhcyB1dGY4IGZyb20gXCJ1dGY4XCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxudmFyIGhlID0gcmVxdWlyZSgnaGUnKTtcclxuXHJcbmNvbnN0IGltYWdlU291cmNlID0gcmVxdWlyZShcImltYWdlLXNvdXJjZVwiKTtcclxudmFyIHRpbWVyID0gcmVxdWlyZShcInRpbWVyXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXHJcbiAgcHJvdmlkZXJzOiBbTW9kYWxEaWFsb2dTZXJ2aWNlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtNb2RhbFZpZXdDb21wb25lbnRdLFxyXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2Nvbm5lY3QvY29ubmVjdC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9jb25uZWN0L2Nvbm5lY3QtY29tbW9uLmNzc1wiLCBcInBhZ2VzL2Nvbm5lY3QvY29ubmVjdC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbm5lY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGlzTG9nZ2luZ0luID0gdHJ1ZTtcclxuICBpc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gIGFuaW1hdGlvblNldDogYW5pbWF0aW9uLkFuaW1hdGlvbjtcclxuICBkZXZpY2U6IEJsdWV0b290aERldmljZTtcclxuXHJcbiAgQFZpZXdDaGlsZChcIndpZmlcIikgd2lmaTogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwid2lmaWluYWN0aXZlXCIpIHdpZmlpbmFjdGl2ZTogRWxlbWVudFJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgICB0aGlzLmRldmljZSA9IG5ldyBCbHVldG9vdGhEZXZpY2UoKTtcclxuICAgIHRoaXMuZGV2aWNlLmlzQ29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmRldmljZS5VVUlEID0gXCIzMDpBRTpBNDoxODoxQjoxNlwiO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhZ2UuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKFwiIzRFMkM1MlwiKTtcclxuXHJcbiAgICBjb25zdCBpbWcgPSBpbWFnZVNvdXJjZS5mcm9tUmVzb3VyY2UoXCJ3aWZpX2luYWN0aWZcIik7XHJcblxyXG4gICAgdGhpcy5ibHVldG9vdGhFbmFibGVkKClcclxuICAgICAgLnRoZW4oXHJcbiAgICAgICAgKGVuYWJsZWQpID0+IHtcclxuICAgICAgICAgIGlmIChlbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmx1ZXRvb3RoIGVuYWJsZWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UGVybWlzc2lvbigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9Fc3AoXCIzMDpBRTpBNDoxODoxQjoxNlwiKTsgICAgICAgICAgICBcclxuICAgICAgICAgIH0gXHJcbiAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBibHVldG9vdGguZW5hYmxlKCkudGhlbihcclxuICAgICAgICAgICAgICAoZW5hYmxlZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCbHVldG9vdGggZW5hYmxlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQZXJtaXNzaW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb0VzcChcIjMwOkFFOkE0OjE4OjFCOjE2XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiQ2Fubm90IHVzZSB0aGUgYXBwbGljYXRpb24gd2l0aG91dCBibHVldG9vdGhcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICkgIFxyXG4gIH1cclxuXHJcbiAgc2F2ZVRhYmxlTnVtYmVyKCkge1xyXG4gICAgaWYgKHRoaXMuZGV2aWNlLmlzQ29ubmVjdGVkKSB7XHJcbiAgICAgIGlmICh0aGlzLmRldmljZS50YWJsZU51bWJlcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIE5hbWU6IFwiICsgdGhpcy5kZXZpY2UubmFtZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJEZXZpY2UgVVVJRDogXCIgKyB0aGlzLmRldmljZS5VVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRhYmxlIE51bWJlcjogXCIgKyB0aGlzLmRldmljZS50YWJsZU51bWJlcik7XHJcbiAgICAgICAgdGhpcy53cml0ZVRhYmxlTnVtYmVyKHRoaXMuZGV2aWNlLnRhYmxlTnVtYmVyLCB0aGlzLmRldmljZS5VVUlEKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAvLyAgIHRpdGxlOiBcIlRhYmxlIG51bWJlciBlbXB0eVwiLFxyXG4gICAgICAgIC8vICAgbWVzc2FnZTogXCJQbGVhc2UgZW50ZXIgdGhlIHRhYmxlIG51bWJlclwiLFxyXG4gICAgICAgIC8vICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICB0aGlzLmNyZWF0ZU1vZGFsVmlldyhcIlRhYmxlIG51bWJlciBlbXB0eVwiLCBcIlBsZWFzZSBlbnRlciB0aGUgdGFibGUgbnVtYmVyXCIpXHJcbiAgICAgICAgICAudGhlbigpXHJcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBcclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgYWxlcnQoXCJObyBkZXZpY2VzIGNvbm5lY3RlZFwiKTtcclxuICAgICAgdGhpcy5jb25uZWN0VG9Fc3AodGhpcy5kZXZpY2UuVVVJRCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBibHVldG9vdGhFbmFibGVkKCkge1xyXG4gICAgcmV0dXJuIGJsdWV0b290aC5pc0JsdWV0b290aEVuYWJsZWQoKTtcclxuICB9XHJcblxyXG4gIGdldFBlcm1pc3Npb24oKSB7XHJcbiAgICAgIGJsdWV0b290aC5oYXNDb2Fyc2VMb2NhdGlvblBlcm1pc3Npb24oKVxyXG4gICAgICAgICAgLnRoZW4oKGdyYW50ZWQpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoIWdyYW50ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgYmx1ZXRvb3RoLnJlcXVlc3RDb2Fyc2VMb2NhdGlvblBlcm1pc3Npb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJMb2NhdGlvbiBwZXJtaXNzaW9uIHJlcXVlc3RlZFwiKSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBlcm1pc3Npb24gZ3JhbnRlZFwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbm5lY3RUb0VzcChpZDogc3RyaW5nKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiVHJ5aW5nIHRvIGNvbm5lY3Qgd2l0aDogXCIgKyBpZCk7XHJcbiAgICAgIGJsdWV0b290aC5jb25uZWN0KHtcclxuICAgICAgICAgIFVVSUQ6IGlkLFxyXG4gICAgICAgICAgb25Db25uZWN0ZWQ6IChwZXJpcGhlcmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZDogJyArIHBlcmlwaGVyYWwubmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5kZXZpY2UuaXNDb25uZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHRoaXMuZGV2aWNlLm5hbWUgPSBwZXJpcGhlcmFsLm5hbWU7XHJcbiAgICAgICAgICAgICAgLy8gcGVyaXBoZXJhbC5zZXJ2aWNlcy5mb3JFYWNoKChzZXJ2aWNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcInNlcnZpY2UgZm91bmQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoc2VydmljZSkpXHJcbiAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSgpO1xyXG5cclxuICAgICAgICAgICAgICAvLyB0aGlzLndyaXRlVGFibGVOdW1iZXIodGhpcy5kZXZpY2UudGFibGVfbnVtYmVyLCBpZCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgb25EaXNjb25uZWN0ZWQ6IChwZXJpcGhlcmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Rpc2Nvbm5lY3RlZDogJyArIHBlcmlwaGVyYWwubmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9Fc3AoaWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHdyaXRlVGFibGVOdW1iZXIobnVtYmVyOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgLy8gbGV0IGVuY29kZWRTdHJpbmcgPSBlbmNvZGVyLmVuY29kZShcInRlc3RcIik7XHJcbiAgICAgIGxldCB1dGZTdHJpbmcgPSBoZS5lbmNvZGUobnVtYmVyLCB7J2VuY29kZUV2ZXJ5dGhpbmcnOiB0cnVlfSk7XHJcbiAgICAgIHV0ZlN0cmluZyA9IHV0ZlN0cmluZy5yZXBsYWNlKG5ldyBSZWdFeHAoJzsnLCdnJyksIFwiLFwiKTtcclxuICAgICAgdXRmU3RyaW5nID0gdXRmU3RyaW5nLnJlcGxhY2UobmV3IFJlZ0V4cCgnJiMnLCdnJyksIFwiMFwiKTtcclxuICAgICAgLy8gdXRmU3RyaW5nID0gdXRmU3RyaW5nLnN1YnN0cmluZygwLCB1dGZTdHJpbmcubGVuZ2h0IC0gMSk7XHJcbiAgICAgIC8vIGxldCB1dGZTdHJpbmcgPSB1dGY4LmRlY29kZShcIlxceDc0XFx4NjVcXHg3M1xceDc0XCIpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhoZS5lbmNvZGUoXCJ0ZXN0XCIsIHsnZW5jb2RlRXZlcnl0aGluZyc6IHRydWV9KSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHV0ZlN0cmluZyk7ICBcclxuXHJcbiAgICAgIGJsdWV0b290aC53cml0ZSh7XHJcbiAgICAgICAgcGVyaXBoZXJhbFVVSUQ6IGlkLFxyXG4gICAgICAgIHNlcnZpY2VVVUlEOiBcIjAwZmZcIixcclxuICAgICAgICBjaGFyYWN0ZXJpc3RpY1VVSUQ6IFwiZmYwMVwiLFxyXG4gICAgICAgIHZhbHVlOiB1dGZTdHJpbmdcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTW9kYWxWaWV3KFwiU3VjY2VzcyAhIVwiLCBcIlRhYmxlIG51bWJlciBzYXZlZFwiKVxyXG4gICAgICAgIC50aGVuKClcclxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTW9kYWxWaWV3KFwiRXJyb3JcIiwgZXJyKVxyXG4gICAgICAgIC50aGVuKClcclxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIFxyXG4gIGNoYW5nZUltYWdlKCkge1xyXG4gICAgbGV0IHdpZmlJbWFnZSA9IDxJbWFnZT50aGlzLndpZmkubmF0aXZlRWxlbWVudDtcclxuICAgIGxldCB3aWZpSW5hY3RpdmVJbWFnZSA9IDxJbWFnZT50aGlzLndpZmlpbmFjdGl2ZS5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgIHRoaXMuYW5pbWF0aW9uU2V0ID0gbmV3IGFuaW1hdGlvbi5BbmltYXRpb24oW3tcclxuICAgICAgdGFyZ2V0OiB3aWZpSW1hZ2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICBpdGVyYXRpb25zOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXHJcbiAgICAgIFxyXG4gICAgfV0pO1xyXG4gICAgdGhpcy5hbmltYXRpb25TZXQucGxheSgpLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbmltYXRpb24gc3RvcHBlZCFcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBhbmltYXRpb25JbmFjdGl2ZSA9IG5ldyBhbmltYXRpb24uQW5pbWF0aW9uKFt7XHJcbiAgICAgIHRhcmdldDogd2lmaUluYWN0aXZlSW1hZ2UsXHJcbiAgICAgIG9wYWNpdHk6IDEwMCxcclxuICAgICAgZHVyYXRpb246IDIwMDAsXHJcbiAgICAgIGl0ZXJhdGlvbnM6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcclxuICAgICAgXHJcbiAgICB9XSk7XHJcbiAgICBhbmltYXRpb25JbmFjdGl2ZS5wbGF5KCkuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFuaW1hdGlvbiBzdG9wcGVkIVwiKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVNb2RhbFZpZXcodGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcclxuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcclxuICAgICAgY29udGV4dDoge3RpdGxlOiB0aXRsZSwgbWVzc2FnZTogbWVzc2FnZX0sXHJcbiAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLCAgICAgIFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKE1vZGFsVmlld0NvbXBvbmVudCwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHtcclxuICAgIGFsZXJ0KFwiRXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgY29uc29sZS5kaXIoZXJyb3IpO1xyXG4gIH1cclxufSJdfQ==