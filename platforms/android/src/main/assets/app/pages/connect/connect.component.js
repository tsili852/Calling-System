"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var color_1 = require("color");
var bluetooth_device_1 = require("../../shared/bluetooth/bluetooth-device");
var animation = require("tns-core-modules/ui/animation");
var bluetooth = require("nativescript-bluetooth");
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
            console.log("Device Name: " + this.device.name);
            console.log("Device UUID: " + this.device.UUID);
            console.log("Table Number: " + this.device.tableNumber);
            this.writeTableNumber(this.device.tableNumber, this.device.UUID);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQUN6RSxnQ0FBK0I7QUFDL0IsK0JBQThCO0FBSTlCLDRFQUEwRTtBQUMxRSx5REFBMkQ7QUFDM0Qsa0RBQXFEO0FBRXJELElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV2QixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBUTdCLElBQWEsZ0JBQWdCO0lBUzNCLDBCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVI5QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQVFsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksa0NBQWUsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQztJQUN6QyxDQUFDO0lBRUQsc0NBQVcsR0FBWDtRQUNFLElBQUksU0FBUyxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQy9DLElBQUksaUJBQWlCLEdBQVUsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFVBQVUsRUFBRSxNQUFNLENBQUMsaUJBQWlCO2FBRXJDLENBQUMsQ0FBQyxDQUFDO1FBQ0os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RSxRQUFRO1FBQ2xCLFNBQVMsRUFBRSxFQUFFO1FBQ2IsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSwyQkFBMkIsQ0FBQztLQUM3RSxDQUFDO3FDQVUwQixXQUFJO0dBVG5CLGdCQUFnQixDQTBKNUI7QUExSlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuaW1wb3J0IHsgc2V0SGludENvbG9yIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2hpbnQtdXRpbFwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xyXG5pbXBvcnQgeyBCbHVldG9vdGhEZXZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2JsdWV0b290aC9ibHVldG9vdGgtZGV2aWNlXCI7XHJcbmltcG9ydCAqIGFzIGFuaW1hdGlvbiBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IGJsdWV0b290aCA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1ibHVldG9vdGgnKTtcclxuaW1wb3J0ICogYXMgdXRmOCBmcm9tIFwidXRmOFwiO1xyXG52YXIgaGUgPSByZXF1aXJlKCdoZScpO1xyXG5cclxuY29uc3QgaW1hZ2VTb3VyY2UgPSByZXF1aXJlKFwiaW1hZ2Utc291cmNlXCIpO1xyXG52YXIgdGltZXIgPSByZXF1aXJlKFwidGltZXJcIik7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJteS1hcHBcIixcclxuICBwcm92aWRlcnM6IFtdLFxyXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2Nvbm5lY3QvY29ubmVjdC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9jb25uZWN0L2Nvbm5lY3QtY29tbW9uLmNzc1wiLCBcInBhZ2VzL2Nvbm5lY3QvY29ubmVjdC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbm5lY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGlzTG9nZ2luZ0luID0gdHJ1ZTtcclxuICBpc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gIGFuaW1hdGlvblNldDogYW5pbWF0aW9uLkFuaW1hdGlvbjtcclxuICBkZXZpY2U6IEJsdWV0b290aERldmljZTtcclxuXHJcbiAgQFZpZXdDaGlsZChcIndpZmlcIikgd2lmaTogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwid2lmaWluYWN0aXZlXCIpIHdpZmlpbmFjdGl2ZTogRWxlbWVudFJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKSB7XHJcbiAgICB0aGlzLmRldmljZSA9IG5ldyBCbHVldG9vdGhEZXZpY2UoKTtcclxuICAgIHRoaXMuZGV2aWNlLmlzQ29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmRldmljZS5VVUlEID0gXCIzMDpBRTpBNDoxODoxQjoxNlwiO1xyXG4gIH1cclxuICBcclxuICBjaGFuZ2VJbWFnZSgpIHtcclxuICAgIGxldCB3aWZpSW1hZ2UgPSA8SW1hZ2U+dGhpcy53aWZpLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBsZXQgd2lmaUluYWN0aXZlSW1hZ2UgPSA8SW1hZ2U+dGhpcy53aWZpaW5hY3RpdmUubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICB0aGlzLmFuaW1hdGlvblNldCA9IG5ldyBhbmltYXRpb24uQW5pbWF0aW9uKFt7XHJcbiAgICAgIHRhcmdldDogd2lmaUltYWdlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICBkdXJhdGlvbjogMTAwMCxcclxuICAgICAgaXRlcmF0aW9uczogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLFxyXG4gICAgICBcclxuICAgIH1dKTtcclxuICAgIHRoaXMuYW5pbWF0aW9uU2V0LnBsYXkoKS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQW5pbWF0aW9uIHN0b3BwZWQhXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYW5pbWF0aW9uSW5hY3RpdmUgPSBuZXcgYW5pbWF0aW9uLkFuaW1hdGlvbihbe1xyXG4gICAgICB0YXJnZXQ6IHdpZmlJbmFjdGl2ZUltYWdlLFxyXG4gICAgICBvcGFjaXR5OiAxMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICBpdGVyYXRpb25zOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXHJcbiAgICAgIFxyXG4gICAgfV0pO1xyXG4gICAgYW5pbWF0aW9uSW5hY3RpdmUucGxheSgpLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbmltYXRpb24gc3RvcHBlZCFcIik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5wYWdlLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiM0RTJDNTJcIik7XHJcblxyXG4gICAgY29uc3QgaW1nID0gaW1hZ2VTb3VyY2UuZnJvbVJlc291cmNlKFwid2lmaV9pbmFjdGlmXCIpO1xyXG5cclxuICAgIHRoaXMuYmx1ZXRvb3RoRW5hYmxlZCgpXHJcbiAgICAgIC50aGVuKFxyXG4gICAgICAgIChlbmFibGVkKSA9PiB7XHJcbiAgICAgICAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJsdWV0b290aCBlbmFibGVkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdldFBlcm1pc3Npb24oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvRXNwKFwiMzA6QUU6QTQ6MTg6MUI6MTZcIik7ICAgICAgICAgICAgXHJcbiAgICAgICAgICB9IFxyXG4gICAgICAgICAgZWxzZSBcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYmx1ZXRvb3RoLmVuYWJsZSgpLnRoZW4oXHJcbiAgICAgICAgICAgICAgKGVuYWJsZWQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmx1ZXRvb3RoIGVuYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGVybWlzc2lvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9Fc3AoXCIzMDpBRTpBNDoxODoxQjoxNlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBhbGVydChcIkNhbm5vdCB1c2UgdGhlIGFwcGxpY2F0aW9uIHdpdGhvdXQgYmx1ZXRvb3RoXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICApICBcclxuICB9XHJcblxyXG4gIHNhdmVUYWJsZU51bWJlcigpIHtcclxuICAgIGlmICh0aGlzLmRldmljZS5pc0Nvbm5lY3RlZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkRldmljZSBOYW1lOiBcIiArIHRoaXMuZGV2aWNlLm5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkRldmljZSBVVUlEOiBcIiArIHRoaXMuZGV2aWNlLlVVSUQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlRhYmxlIE51bWJlcjogXCIgKyB0aGlzLmRldmljZS50YWJsZU51bWJlcik7XHJcbiAgICAgIHRoaXMud3JpdGVUYWJsZU51bWJlcih0aGlzLmRldmljZS50YWJsZU51bWJlciwgdGhpcy5kZXZpY2UuVVVJRCk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIGFsZXJ0KFwiTm8gZGV2aWNlcyBjb25uZWN0ZWRcIik7XHJcbiAgICAgIHRoaXMuY29ubmVjdFRvRXNwKHRoaXMuZGV2aWNlLlVVSUQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYmx1ZXRvb3RoRW5hYmxlZCgpIHtcclxuICAgIHJldHVybiBibHVldG9vdGguaXNCbHVldG9vdGhFbmFibGVkKCk7XHJcbiAgfVxyXG5cclxuICBnZXRQZXJtaXNzaW9uKCkge1xyXG4gICAgICBibHVldG9vdGguaGFzQ29hcnNlTG9jYXRpb25QZXJtaXNzaW9uKClcclxuICAgICAgICAgIC50aGVuKChncmFudGVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFncmFudGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgIGJsdWV0b290aC5yZXF1ZXN0Q29hcnNlTG9jYXRpb25QZXJtaXNzaW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKFwiTG9jYXRpb24gcGVybWlzc2lvbiByZXF1ZXN0ZWRcIikpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQZXJtaXNzaW9uIGdyYW50ZWRcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0VG9Fc3AoaWQ6IHN0cmluZykge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlRyeWluZyB0byBjb25uZWN0IHdpdGg6IFwiICsgaWQpO1xyXG4gICAgICBibHVldG9vdGguY29ubmVjdCh7XHJcbiAgICAgICAgICBVVUlEOiBpZCxcclxuICAgICAgICAgIG9uQ29ubmVjdGVkOiAocGVyaXBoZXJhbCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQ6ICcgKyBwZXJpcGhlcmFsLm5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuZGV2aWNlLmlzQ29ubmVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB0aGlzLmRldmljZS5uYW1lID0gcGVyaXBoZXJhbC5uYW1lO1xyXG4gICAgICAgICAgICAgIC8vIHBlcmlwaGVyYWwuc2VydmljZXMuZm9yRWFjaCgoc2VydmljZSkgPT4ge1xyXG4gICAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2coXCJzZXJ2aWNlIGZvdW5kOiBcIiArIEpTT04uc3RyaW5naWZ5KHNlcnZpY2UpKVxyXG4gICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gdGhpcy53cml0ZVRhYmxlTnVtYmVyKHRoaXMuZGV2aWNlLnRhYmxlX251bWJlciwgaWQpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9uRGlzY29ubmVjdGVkOiAocGVyaXBoZXJhbCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEaXNjb25uZWN0ZWQ6ICcgKyBwZXJpcGhlcmFsLm5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvRXNwKGlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVRhYmxlTnVtYmVyKG51bWJlcjogc3RyaW5nLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgIC8vIGxldCBlbmNvZGVkU3RyaW5nID0gZW5jb2Rlci5lbmNvZGUoXCJ0ZXN0XCIpO1xyXG4gICAgICBsZXQgdXRmU3RyaW5nID0gaGUuZW5jb2RlKG51bWJlciwgeydlbmNvZGVFdmVyeXRoaW5nJzogdHJ1ZX0pO1xyXG4gICAgICB1dGZTdHJpbmcgPSB1dGZTdHJpbmcucmVwbGFjZShuZXcgUmVnRXhwKCc7JywnZycpLCBcIixcIik7XHJcbiAgICAgIHV0ZlN0cmluZyA9IHV0ZlN0cmluZy5yZXBsYWNlKG5ldyBSZWdFeHAoJyYjJywnZycpLCBcIjBcIik7XHJcbiAgICAgIC8vIHV0ZlN0cmluZyA9IHV0ZlN0cmluZy5zdWJzdHJpbmcoMCwgdXRmU3RyaW5nLmxlbmdodCAtIDEpO1xyXG4gICAgICAvLyBsZXQgdXRmU3RyaW5nID0gdXRmOC5kZWNvZGUoXCJcXHg3NFxceDY1XFx4NzNcXHg3NFwiKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coaGUuZW5jb2RlKFwidGVzdFwiLCB7J2VuY29kZUV2ZXJ5dGhpbmcnOiB0cnVlfSkpO1xyXG4gICAgICBjb25zb2xlLmxvZyh1dGZTdHJpbmcpOyAgXHJcblxyXG4gICAgICBibHVldG9vdGgud3JpdGUoe1xyXG4gICAgICAgIHBlcmlwaGVyYWxVVUlEOiBpZCxcclxuICAgICAgICBzZXJ2aWNlVVVJRDogXCIwMGZmXCIsXHJcbiAgICAgICAgY2hhcmFjdGVyaXN0aWNVVUlEOiBcImZmMDFcIixcclxuICAgICAgICB2YWx1ZTogdXRmU3RyaW5nXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBhbGVydChcIlRhYmxlIG51bWJlciBzYXZlZFwiKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBhbGVydChcIkVycm9yOiBcIiArIGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufSJdfQ==