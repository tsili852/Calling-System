"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var bluetooth = require("nativescript-bluetooth");
require("rxjs/add/operator/distinctUntilChanged");
var BluetoothService = (function () {
    function BluetoothService() {
    }
    BluetoothService.prototype.bluetoothEnabled = function () {
        return bluetooth.isBluetoothEnabled();
    };
    BluetoothService.prototype.getPermission = function () {
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
    BluetoothService.prototype.connectToEsp = function (id) {
        var _this = this;
        console.log("Trying to connect with: " + id);
        bluetooth.connect({
            UUID: id,
            onConnected: function (peripheral) {
                console.log('Connected: ' + peripheral.name);
            },
            onDisconnected: function (peripheral) {
                _this.connectToEsp(id);
            }
        });
    };
    BluetoothService.prototype.writeTableNumber = function (number) {
    };
    return BluetoothService;
}());
BluetoothService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], BluetoothService);
exports.BluetoothService = BluetoothService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZXRvb3RoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibHVldG9vdGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxrREFBcUQ7QUFFckQsa0RBQWdEO0FBS2hELElBQWEsZ0JBQWdCO0lBQ3pCO0lBQWUsQ0FBQztJQUVoQiwyQ0FBZ0IsR0FBaEI7UUFDSSxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELHdDQUFhLEdBQWI7UUFDSSxTQUFTLENBQUMsMkJBQTJCLEVBQUU7YUFDbEMsSUFBSSxDQUFDLFVBQUMsT0FBTztZQUNWLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDWCxTQUFTLENBQUMsK0JBQStCLEVBQUU7cUJBQ3RDLElBQUksQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN0QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsdUNBQVksR0FBWixVQUFhLEVBQVU7UUFBdkIsaUJBV0M7UUFWRyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDZCxJQUFJLEVBQUUsRUFBRTtZQUNSLFdBQVcsRUFBRSxVQUFDLFVBQVU7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxDQUFDO1lBQ0QsY0FBYyxFQUFFLFVBQUMsVUFBVTtnQkFDdkIsS0FBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDJDQUFnQixHQUFoQixVQUFpQixNQUFjO0lBRS9CLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFwQ0QsSUFvQ0M7QUFwQ1ksZ0JBQWdCO0lBRDVCLGlCQUFVLEVBQUU7O0dBQ0EsZ0JBQWdCLENBb0M1QjtBQXBDWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBibHVldG9vdGggPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtYmx1ZXRvb3RoJyk7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZGlzdGluY3RVbnRpbENoYW5nZWQnO1xyXG5cclxuaW1wb3J0IHsgQmx1ZXRvb3RoRGV2aWNlIH0gZnJvbSBcIi4vYmx1ZXRvb3RoLWRldmljZVwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmx1ZXRvb3RoU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgYmx1ZXRvb3RoRW5hYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gYmx1ZXRvb3RoLmlzQmx1ZXRvb3RoRW5hYmxlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBlcm1pc3Npb24oKSB7XHJcbiAgICAgICAgYmx1ZXRvb3RoLmhhc0NvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAgIC50aGVuKChncmFudGVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWdyYW50ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBibHVldG9vdGgucmVxdWVzdENvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKFwiTG9jYXRpb24gcGVybWlzc2lvbiByZXF1ZXN0ZWRcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQZXJtaXNzaW9uIGdyYW50ZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3RUb0VzcChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUcnlpbmcgdG8gY29ubmVjdCB3aXRoOiBcIiArIGlkKTtcclxuICAgICAgICBibHVldG9vdGguY29ubmVjdCh7XHJcbiAgICAgICAgICAgIFVVSUQ6IGlkLFxyXG4gICAgICAgICAgICBvbkNvbm5lY3RlZDogKHBlcmlwaGVyYWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQ6ICcgKyBwZXJpcGhlcmFsLm5hbWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkRpc2Nvbm5lY3RlZDogKHBlcmlwaGVyYWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvRXNwKGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlVGFibGVOdW1iZXIobnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgIH1cclxufSJdfQ==