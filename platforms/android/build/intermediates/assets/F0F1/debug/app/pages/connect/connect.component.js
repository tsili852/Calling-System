"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var color_1 = require("color");
var animation = require("tns-core-modules/ui/animation");
var bluetooth = require("nativescript-bluetooth");
// import encoder = require("text-encoding");
var utf8 = require("utf8");
var imageSource = require("image-source");
var timer = require("timer");
var ConnectComponent = (function () {
    function ConnectComponent(page) {
        this.page = page;
        this.isLoggingIn = true;
        this.isConnected = false;
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
                // this.connectToEsp("30:AE:A4:18:1B:12");
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
                // peripheral.services.forEach((service) => {
                //   console.log("service found: " + JSON.stringify(service))
                // });
                _this.changeImage();
                _this.writeTableNumber(1, id);
            },
            onDisconnected: function (peripheral) {
                console.log('Disconnected: ' + peripheral.name);
                _this.connectToEsp(id);
            }
        });
    };
    ConnectComponent.prototype.writeTableNumber = function (number, id) {
        // let encodedString = encoder.encode("test");
        var utfString = utf8.encode("Test");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQUN6RSxnQ0FBK0I7QUFDL0IsK0JBQThCO0FBSzlCLHlEQUEyRDtBQUUzRCxrREFBcUQ7QUFDckQsNkNBQTZDO0FBQzdDLDJCQUE2QjtBQUU3QixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBUTdCLElBQWEsZ0JBQWdCO0lBUTNCLDBCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVA5QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztJQU1hLENBQUM7SUFFbEMsc0NBQVcsR0FBWDtRQUNFLElBQUksU0FBUyxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQy9DLElBQUksaUJBQWlCLEdBQVUsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFVBQVUsRUFBRSxNQUFNLENBQUMsaUJBQWlCO2FBRXJDLENBQUMsQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQU0saUJBQWlCLEdBQUcsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JB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QWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuaW1wb3J0IHsgc2V0SGludENvbG9yIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2hpbnQtdXRpbFwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xyXG5pbXBvcnQgeyBCbHVldG9vdGhEZXZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2JsdWV0b290aC9ibHVldG9vdGgtZGV2aWNlXCI7XHJcbmltcG9ydCAqIGFzIGFuaW1hdGlvbiBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9hbmltYXRpb25cIjtcclxuXHJcbmltcG9ydCBibHVldG9vdGggPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtYmx1ZXRvb3RoJyk7XHJcbi8vIGltcG9ydCBlbmNvZGVyID0gcmVxdWlyZShcInRleHQtZW5jb2RpbmdcIik7XHJcbmltcG9ydCAqIGFzIHV0ZjggZnJvbSBcInV0ZjhcIjtcclxuXHJcbmNvbnN0IGltYWdlU291cmNlID0gcmVxdWlyZShcImltYWdlLXNvdXJjZVwiKTtcclxudmFyIHRpbWVyID0gcmVxdWlyZShcInRpbWVyXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXHJcbiAgcHJvdmlkZXJzOiBbXSxcclxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9jb25uZWN0L2Nvbm5lY3QuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wicGFnZXMvY29ubmVjdC9jb25uZWN0LWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9jb25uZWN0L2Nvbm5lY3QuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb25uZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBpc0xvZ2dpbmdJbiA9IHRydWU7XHJcbiAgaXNDb25uZWN0ZWQgPSBmYWxzZTtcclxuICBhbmltYXRpb25TZXQ6IGFuaW1hdGlvbi5BbmltYXRpb247XHJcblxyXG4gIEBWaWV3Q2hpbGQoXCJ3aWZpXCIpIHdpZmk6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcIndpZmlpbmFjdGl2ZVwiKSB3aWZpaW5hY3RpdmU6IEVsZW1lbnRSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSkge31cclxuICBcclxuICBjaGFuZ2VJbWFnZSgpIHtcclxuICAgIGxldCB3aWZpSW1hZ2UgPSA8SW1hZ2U+dGhpcy53aWZpLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBsZXQgd2lmaUluYWN0aXZlSW1hZ2UgPSA8SW1hZ2U+dGhpcy53aWZpaW5hY3RpdmUubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICB0aGlzLmFuaW1hdGlvblNldCA9IG5ldyBhbmltYXRpb24uQW5pbWF0aW9uKFt7XHJcbiAgICAgIHRhcmdldDogd2lmaUltYWdlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICBkdXJhdGlvbjogMTAwMCxcclxuICAgICAgaXRlcmF0aW9uczogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLFxyXG4gICAgICBcclxuICAgIH1dKTtcclxuICAgIHRoaXMuYW5pbWF0aW9uU2V0LnBsYXkoKS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQW5pbWF0aW9uIHN0b3BwZWQhXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYW5pbWF0aW9uSW5hY3RpdmUgPSBuZXcgYW5pbWF0aW9uLkFuaW1hdGlvbihbe1xyXG4gICAgICB0YXJnZXQ6IHdpZmlJbmFjdGl2ZUltYWdlLFxyXG4gICAgICBvcGFjaXR5OiAxMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICBpdGVyYXRpb25zOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXHJcbiAgICAgIFxyXG4gICAgfV0pO1xyXG4gICAgYW5pbWF0aW9uSW5hY3RpdmUucGxheSgpLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbmltYXRpb24gc3RvcHBlZCFcIik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5wYWdlLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiM0RTJDNTJcIik7XHJcblxyXG4gICAgY29uc3QgaW1nID0gaW1hZ2VTb3VyY2UuZnJvbVJlc291cmNlKFwid2lmaV9pbmFjdGlmXCIpO1xyXG5cclxuICAgIHRoaXMuYmx1ZXRvb3RoRW5hYmxlZCgpXHJcbiAgICAgIC50aGVuKFxyXG4gICAgICAgIChlbmFibGVkKSA9PiB7XHJcbiAgICAgICAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJsdWV0b290aCBlbmFibGVkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdldFBlcm1pc3Npb24oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvRXNwKFwiMzA6QUU6QTQ6MTg6MUI6MTZcIik7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuY29ubmVjdFRvRXNwKFwiMzA6QUU6QTQ6MTg6MUI6MTJcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYmx1ZXRvb3RoLmVuYWJsZSgpLnRoZW4oXHJcbiAgICAgICAgICAgICAgKGVuYWJsZWQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmx1ZXRvb3RoIGVuYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGVybWlzc2lvbigpO1xyXG4gICAgICBcclxuICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9Fc3AoXCIzMDpBRTpBNDoxODoxQjoxNlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBhbGVydChcIkNhbm5vdCB1c2UgdGhlIGFwcGxpY2F0aW9uIHdpdGhvdXQgYmx1ZXRvb3RoXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICApICBcclxuICB9XHJcblxyXG4gIGJsdWV0b290aEVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gYmx1ZXRvb3RoLmlzQmx1ZXRvb3RoRW5hYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGVybWlzc2lvbigpIHtcclxuICAgICAgYmx1ZXRvb3RoLmhhc0NvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAudGhlbigoZ3JhbnRlZCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghZ3JhbnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICBibHVldG9vdGgucmVxdWVzdENvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIHBlcm1pc3Npb24gcmVxdWVzdGVkXCIpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVybWlzc2lvbiBncmFudGVkXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdFRvRXNwKGlkOiBzdHJpbmcpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJUcnlpbmcgdG8gY29ubmVjdCB3aXRoOiBcIiArIGlkKTtcclxuICAgICAgYmx1ZXRvb3RoLmNvbm5lY3Qoe1xyXG4gICAgICAgICAgVVVJRDogaWQsXHJcbiAgICAgICAgICBvbkNvbm5lY3RlZDogKHBlcmlwaGVyYWwpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkOiAnICsgcGVyaXBoZXJhbC5uYW1lKTtcclxuICAgICAgICAgICAgICAvLyBwZXJpcGhlcmFsLnNlcnZpY2VzLmZvckVhY2goKHNlcnZpY2UpID0+IHtcclxuICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwic2VydmljZSBmb3VuZDogXCIgKyBKU09OLnN0cmluZ2lmeShzZXJ2aWNlKSlcclxuICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKCk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMud3JpdGVUYWJsZU51bWJlcigxLCBpZCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgb25EaXNjb25uZWN0ZWQ6IChwZXJpcGhlcmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Rpc2Nvbm5lY3RlZDogJyArIHBlcmlwaGVyYWwubmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9Fc3AoaWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHdyaXRlVGFibGVOdW1iZXIobnVtYmVyOiBudW1iZXIsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgLy8gbGV0IGVuY29kZWRTdHJpbmcgPSBlbmNvZGVyLmVuY29kZShcInRlc3RcIik7XHJcbiAgICAgIGxldCB1dGZTdHJpbmcgPSB1dGY4LmVuY29kZShcIlRlc3RcIik7XHJcblxyXG4gICAgICBibHVldG9vdGgud3JpdGUoe1xyXG4gICAgICAgIHBlcmlwaGVyYWxVVUlEOiBpZCxcclxuICAgICAgICBzZXJ2aWNlVVVJRDogXCIwMGZmXCIsXHJcbiAgICAgICAgY2hhcmFjdGVyaXN0aWNVVUlEOiBcImZmMDFcIixcclxuICAgICAgICB2YWx1ZTogdXRmU3RyaW5nXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBhbGVydChcIlRhYmxlIG51bWJlciBzYXZlZFwiKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBhbGVydChcIkVycm9yOiBcIiArIGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufSJdfQ==