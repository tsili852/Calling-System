"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var color_1 = require("color");
var animation = require("tns-core-modules/ui/animation");
var bluetooth = require("nativescript-bluetooth");
// import encoder = require("text-encoding");
var utf8 = require("utf8");
var he = require('he');
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
        var utfString = utf8.decode("\x74\x65\x73\x74");
        console.log(he.encode("Test", { 'encodeEverything': true }));
        console.log(utfString);
        bluetooth.write({
            peripheralUUID: id,
            serviceUUID: "00ff",
            characteristicUUID: "ff01",
            value: "0x74,0x65,0x73,0x74"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQUN6RSxnQ0FBK0I7QUFDL0IsK0JBQThCO0FBSzlCLHlEQUEyRDtBQUUzRCxrREFBcUQ7QUFDckQsNkNBQTZDO0FBQzdDLDJCQUE2QjtBQUM3QixJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdkIsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzVDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQVE3QixJQUFhLGdCQUFnQjtJQVEzQiwwQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFQOUIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFNYSxDQUFDO0lBRWxDLHNDQUFXLEdBQVg7UUFDRSxJQUFJLFNBQVMsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUMvQyxJQUFJLGlCQUFpQixHQUFVLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRS9ELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNDLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixPQUFPLEVBQUUsQ0FBQztnQkFDVixRQUFRLEVBQUUsSUFBSTtnQkFDZCxVQUFVLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjthQUVyQyxDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFN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QU56QyxnQkFBZ0I7SUFONUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFNBQVMsRUFBRSxFQUFFO1FBQ2IsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSwyQkFBMkIsQ0FBQztLQUM3RSxDQUFDO3FDQVMwQixXQUFJO0dBUm5CLGdCQUFnQixDQWlJNUI7QUFqSVksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuaW1wb3J0IHsgc2V0SGludENvbG9yIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2hpbnQtdXRpbFwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xyXG5pbXBvcnQgeyBCbHVldG9vdGhEZXZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2JsdWV0b290aC9ibHVldG9vdGgtZGV2aWNlXCI7XHJcbmltcG9ydCAqIGFzIGFuaW1hdGlvbiBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9hbmltYXRpb25cIjtcclxuXHJcbmltcG9ydCBibHVldG9vdGggPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtYmx1ZXRvb3RoJyk7XHJcbi8vIGltcG9ydCBlbmNvZGVyID0gcmVxdWlyZShcInRleHQtZW5jb2RpbmdcIik7XHJcbmltcG9ydCAqIGFzIHV0ZjggZnJvbSBcInV0ZjhcIjtcclxudmFyIGhlID0gcmVxdWlyZSgnaGUnKTtcclxuXHJcbmNvbnN0IGltYWdlU291cmNlID0gcmVxdWlyZShcImltYWdlLXNvdXJjZVwiKTtcclxudmFyIHRpbWVyID0gcmVxdWlyZShcInRpbWVyXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXHJcbiAgcHJvdmlkZXJzOiBbXSxcclxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9jb25uZWN0L2Nvbm5lY3QuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wicGFnZXMvY29ubmVjdC9jb25uZWN0LWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9jb25uZWN0L2Nvbm5lY3QuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb25uZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBpc0xvZ2dpbmdJbiA9IHRydWU7XHJcbiAgaXNDb25uZWN0ZWQgPSBmYWxzZTtcclxuICBhbmltYXRpb25TZXQ6IGFuaW1hdGlvbi5BbmltYXRpb247XHJcblxyXG4gIEBWaWV3Q2hpbGQoXCJ3aWZpXCIpIHdpZmk6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcIndpZmlpbmFjdGl2ZVwiKSB3aWZpaW5hY3RpdmU6IEVsZW1lbnRSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSkge31cclxuICBcclxuICBjaGFuZ2VJbWFnZSgpIHtcclxuICAgIGxldCB3aWZpSW1hZ2UgPSA8SW1hZ2U+dGhpcy53aWZpLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBsZXQgd2lmaUluYWN0aXZlSW1hZ2UgPSA8SW1hZ2U+dGhpcy53aWZpaW5hY3RpdmUubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICB0aGlzLmFuaW1hdGlvblNldCA9IG5ldyBhbmltYXRpb24uQW5pbWF0aW9uKFt7XHJcbiAgICAgIHRhcmdldDogd2lmaUltYWdlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICBkdXJhdGlvbjogMTAwMCxcclxuICAgICAgaXRlcmF0aW9uczogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLFxyXG4gICAgICBcclxuICAgIH1dKTtcclxuICAgIHRoaXMuYW5pbWF0aW9uU2V0LnBsYXkoKS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQW5pbWF0aW9uIHN0b3BwZWQhXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYW5pbWF0aW9uSW5hY3RpdmUgPSBuZXcgYW5pbWF0aW9uLkFuaW1hdGlvbihbe1xyXG4gICAgICB0YXJnZXQ6IHdpZmlJbmFjdGl2ZUltYWdlLFxyXG4gICAgICBvcGFjaXR5OiAxMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICBpdGVyYXRpb25zOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXHJcbiAgICAgIFxyXG4gICAgfV0pO1xyXG4gICAgYW5pbWF0aW9uSW5hY3RpdmUucGxheSgpLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbmltYXRpb24gc3RvcHBlZCFcIik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5wYWdlLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiM0RTJDNTJcIik7XHJcblxyXG4gICAgY29uc3QgaW1nID0gaW1hZ2VTb3VyY2UuZnJvbVJlc291cmNlKFwid2lmaV9pbmFjdGlmXCIpO1xyXG5cclxuICAgIHRoaXMuYmx1ZXRvb3RoRW5hYmxlZCgpXHJcbiAgICAgIC50aGVuKFxyXG4gICAgICAgIChlbmFibGVkKSA9PiB7XHJcbiAgICAgICAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJsdWV0b290aCBlbmFibGVkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdldFBlcm1pc3Npb24oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvRXNwKFwiMzA6QUU6QTQ6MTg6MUI6MTZcIik7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuY29ubmVjdFRvRXNwKFwiMzA6QUU6QTQ6MTg6MUI6MTJcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYmx1ZXRvb3RoLmVuYWJsZSgpLnRoZW4oXHJcbiAgICAgICAgICAgICAgKGVuYWJsZWQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmx1ZXRvb3RoIGVuYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGVybWlzc2lvbigpO1xyXG4gICAgICBcclxuICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9Fc3AoXCIzMDpBRTpBNDoxODoxQjoxNlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBhbGVydChcIkNhbm5vdCB1c2UgdGhlIGFwcGxpY2F0aW9uIHdpdGhvdXQgYmx1ZXRvb3RoXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICApICBcclxuICB9XHJcblxyXG4gIGJsdWV0b290aEVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gYmx1ZXRvb3RoLmlzQmx1ZXRvb3RoRW5hYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGVybWlzc2lvbigpIHtcclxuICAgICAgYmx1ZXRvb3RoLmhhc0NvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAudGhlbigoZ3JhbnRlZCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghZ3JhbnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICBibHVldG9vdGgucmVxdWVzdENvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIHBlcm1pc3Npb24gcmVxdWVzdGVkXCIpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVybWlzc2lvbiBncmFudGVkXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdFRvRXNwKGlkOiBzdHJpbmcpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJUcnlpbmcgdG8gY29ubmVjdCB3aXRoOiBcIiArIGlkKTtcclxuICAgICAgYmx1ZXRvb3RoLmNvbm5lY3Qoe1xyXG4gICAgICAgICAgVVVJRDogaWQsXHJcbiAgICAgICAgICBvbkNvbm5lY3RlZDogKHBlcmlwaGVyYWwpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkOiAnICsgcGVyaXBoZXJhbC5uYW1lKTtcclxuICAgICAgICAgICAgICAvLyBwZXJpcGhlcmFsLnNlcnZpY2VzLmZvckVhY2goKHNlcnZpY2UpID0+IHtcclxuICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwic2VydmljZSBmb3VuZDogXCIgKyBKU09OLnN0cmluZ2lmeShzZXJ2aWNlKSlcclxuICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKCk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMud3JpdGVUYWJsZU51bWJlcigxLCBpZCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgb25EaXNjb25uZWN0ZWQ6IChwZXJpcGhlcmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Rpc2Nvbm5lY3RlZDogJyArIHBlcmlwaGVyYWwubmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9Fc3AoaWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHdyaXRlVGFibGVOdW1iZXIobnVtYmVyOiBudW1iZXIsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgLy8gbGV0IGVuY29kZWRTdHJpbmcgPSBlbmNvZGVyLmVuY29kZShcInRlc3RcIik7XHJcbiAgICAgIGxldCB1dGZTdHJpbmcgPSB1dGY4LmRlY29kZShcIlxceDc0XFx4NjVcXHg3M1xceDc0XCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhoZS5lbmNvZGUoXCJUZXN0XCIsIHsnZW5jb2RlRXZlcnl0aGluZyc6IHRydWV9KSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHV0ZlN0cmluZyk7XHJcblxyXG4gICAgICBibHVldG9vdGgud3JpdGUoe1xyXG4gICAgICAgIHBlcmlwaGVyYWxVVUlEOiBpZCxcclxuICAgICAgICBzZXJ2aWNlVVVJRDogXCIwMGZmXCIsXHJcbiAgICAgICAgY2hhcmFjdGVyaXN0aWNVVUlEOiBcImZmMDFcIixcclxuICAgICAgICB2YWx1ZTogXCIweDc0LDB4NjUsMHg3MywweDc0XCJcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiVGFibGUgbnVtYmVyIHNhdmVkXCIpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiRXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59Il19