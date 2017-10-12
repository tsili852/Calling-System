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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZXRvb3RoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibHVldG9vdGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxrREFBcUQ7QUFFckQsa0RBQWdEO0FBS2hELElBQWEsZ0JBQWdCO0lBQ3pCO0lBQWUsQ0FBQztJQUVoQiwyQ0FBZ0IsR0FBaEI7UUFDSSxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELHdDQUFhLEdBQWI7UUFDSSxTQUFTLENBQUMsMkJBQTJCLEVBQUU7YUFDbEMsSUFBSSxDQUFDLFVBQUMsT0FBTztZQUNWLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDWCxTQUFTLENBQUMsK0JBQStCLEVBQUU7cUJBQ3RDLElBQUksQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN0QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsdUNBQVksR0FBWixVQUFhLEVBQVU7UUFBdkIsaUJBV0M7UUFWRyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDZCxJQUFJLEVBQUUsRUFBRTtZQUNSLFdBQVcsRUFBRSxVQUFDLFVBQVU7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxDQUFDO1lBQ0QsY0FBYyxFQUFFLFVBQUMsVUFBVTtnQkFDdkIsS0FBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDJDQUFnQixHQUFoQixVQUFpQixNQUFjO0lBRS9CLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFwQ0QsSUFvQ0M7QUFwQ1ksZ0JBQWdCO0lBRDVCLGlCQUFVLEVBQUU7O0dBQ0EsZ0JBQWdCLENBb0M1QjtBQXBDWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgYmx1ZXRvb3RoID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWJsdWV0b290aCcpO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZGlzdGluY3RVbnRpbENoYW5nZWQnO1xuXG5pbXBvcnQgeyBCbHVldG9vdGhEZXZpY2UgfSBmcm9tIFwiLi9ibHVldG9vdGgtZGV2aWNlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCbHVldG9vdGhTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBibHVldG9vdGhFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gYmx1ZXRvb3RoLmlzQmx1ZXRvb3RoRW5hYmxlZCgpO1xuICAgIH1cblxuICAgIGdldFBlcm1pc3Npb24oKSB7XG4gICAgICAgIGJsdWV0b290aC5oYXNDb2Fyc2VMb2NhdGlvblBlcm1pc3Npb24oKVxuICAgICAgICAgICAgLnRoZW4oKGdyYW50ZWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWdyYW50ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYmx1ZXRvb3RoLnJlcXVlc3RDb2Fyc2VMb2NhdGlvblBlcm1pc3Npb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJMb2NhdGlvbiBwZXJtaXNzaW9uIHJlcXVlc3RlZFwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBlcm1pc3Npb24gZ3JhbnRlZFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25uZWN0VG9Fc3AoaWQ6IHN0cmluZykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRyeWluZyB0byBjb25uZWN0IHdpdGg6IFwiICsgaWQpO1xuICAgICAgICBibHVldG9vdGguY29ubmVjdCh7XG4gICAgICAgICAgICBVVUlEOiBpZCxcbiAgICAgICAgICAgIG9uQ29ubmVjdGVkOiAocGVyaXBoZXJhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQ6ICcgKyBwZXJpcGhlcmFsLm5hbWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRGlzY29ubmVjdGVkOiAocGVyaXBoZXJhbCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvRXNwKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgd3JpdGVUYWJsZU51bWJlcihudW1iZXI6IG51bWJlcikge1xuICAgICAgICBcbiAgICB9XG59Il19