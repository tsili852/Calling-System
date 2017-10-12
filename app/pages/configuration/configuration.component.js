"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var color_1 = require("color");
var configuration_1 = require("../../shared/configuration/configuration");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var modal_view_component_1 = require("../../pages/modal-view/modal-view.component");
var nativescript_sidedrawer_1 = require("nativescript-sidedrawer");
var applicationSettings = require("tns-core-modules/application-settings");
var router_1 = require("nativescript-angular/router");
var ConfigurationComponent = (function () {
    function ConfigurationComponent(routerExtensions, page, modalService, vcRef) {
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.modalService = modalService;
        this.vcRef = vcRef;
        this.config = new configuration_1.ConfigurationModel();
    }
    ConfigurationComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = false;
        this.page.backgroundColor = new color_1.Color("#4E2C52");
        this.config.wifi_ssid = applicationSettings.getString("wifiSSID");
        this.config.wifi_password = applicationSettings.getString("wifiPassword");
        this.config.licence_number = applicationSettings.getString("licenceNumber");
        if (!this.config.licence_number) {
            this.routerExtensions.navigate(["/register"], { clearHistory: true });
        }
    };
    ConfigurationComponent.prototype.saveConfiguration = function () {
        var _this = this;
        applicationSettings.setString("wifiSSID", this.config.wifi_ssid);
        applicationSettings.setString("wifiPassword", this.config.wifi_password);
        this.createModalView("Configuration Saved", "Wifi SSID and Password saved !")
            .then(function () {
            if (!_this.config.wifi_ssid) {
                _this.routerExtensions.navigate(["/configuration"], { clearHistory: true });
            }
            else {
                _this.routerExtensions.navigate(["/"], { clearHistory: true });
            }
        })
            .catch(function (err) {
            _this.handleError(err);
        });
        // applicationSettings.clear();
    };
    ConfigurationComponent.prototype.openDrawer = function () {
        nativescript_sidedrawer_1.TnsSideDrawer.toggle();
    };
    ConfigurationComponent.prototype.createModalView = function (title, message) {
        var options = {
            viewContainerRef: this.vcRef,
            context: { title: title, message: message },
            fullscreen: false,
        };
        return this.modalService.showModal(modal_view_component_1.ModalViewComponent, options);
    };
    ConfigurationComponent.prototype.handleError = function (error) {
        alert("Error: " + error);
        console.dir(error);
    };
    return ConfigurationComponent;
}());
__decorate([
    core_1.ViewChild("wifiSsid"),
    __metadata("design:type", core_1.ElementRef)
], ConfigurationComponent.prototype, "ssid", void 0);
__decorate([
    core_1.ViewChild("password"),
    __metadata("design:type", core_1.ElementRef)
], ConfigurationComponent.prototype, "password", void 0);
ConfigurationComponent = __decorate([
    core_1.Component({
        selector: "configuration",
        templateUrl: "pages/configuration/configuration.html",
        entryComponents: [modal_view_component_1.ModalViewComponent],
        styleUrls: ["pages/configuration/configuration-common.css", "pages/configuration/configuration.css"]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        page_1.Page,
        modal_dialog_1.ModalDialogService,
        core_1.ViewContainerRef])
], ConfigurationComponent);
exports.ConfigurationComponent = ConfigurationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWd1cmF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUMzRixnQ0FBK0I7QUFDL0IsK0JBQThCO0FBRzlCLDBFQUE4RTtBQUM5RSxrRUFBMkY7QUFDM0Ysb0ZBQWlGO0FBQ2pGLG1FQUF3RDtBQUN4RCwyRUFBNkU7QUFDN0Usc0RBQStEO0FBUS9ELElBQWEsc0JBQXNCO0lBTS9CLGdDQUFvQixnQkFBa0MsRUFDMUMsSUFBVSxFQUNWLFlBQWdDLEVBQ2hDLEtBQXVCO1FBSGYscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUMxQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBRS9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQ0FBa0IsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCx5Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTVFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLENBQUM7SUFDTCxDQUFDO0lBRUQsa0RBQWlCLEdBQWpCO1FBQUEsaUJBaUJDO1FBaEJHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRSxnQ0FBZ0MsQ0FBQzthQUN4RSxJQUFJLENBQUM7WUFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMvRSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEUsQ0FBQztRQUNMLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLEdBQUc7WUFDUCxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBRVAsK0JBQStCO0lBQ25DLENBQUM7SUFFRCwyQ0FBVSxHQUFWO1FBQ0ksdUNBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sZ0RBQWUsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLE9BQWU7UUFDbEQsSUFBTSxPQUFPLEdBQXVCO1lBQ2xDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1lBQzVCLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQztZQUN6QyxVQUFVLEVBQUUsS0FBSztTQUNsQixDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLHlDQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTyw0Q0FBVyxHQUFuQixVQUFvQixLQUFVO1FBQzFCLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBaEVELElBZ0VDO0FBN0QwQjtJQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQzs4QkFBTyxpQkFBVTtvREFBQztBQUNqQjtJQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQzs4QkFBVyxpQkFBVTt3REFBQztBQUpuQyxzQkFBc0I7SUFObEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFdBQVcsRUFBRSx3Q0FBd0M7UUFDckQsZUFBZSxFQUFFLENBQUMseUNBQWtCLENBQUM7UUFDckMsU0FBUyxFQUFFLENBQUMsOENBQThDLEVBQUUsdUNBQXVDLENBQUM7S0FDdkcsQ0FBQztxQ0FPd0MseUJBQWdCO1FBQ3BDLFdBQUk7UUFDSSxpQ0FBa0I7UUFDekIsdUJBQWdCO0dBVDFCLHNCQUFzQixDQWdFbEM7QUFoRVksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcbmltcG9ydCB7IEFjdGlvbkl0ZW0gfSBmcm9tIFwidWkvYWN0aW9uLWJhclwiO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbk1vZGVsIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xuaW1wb3J0IHsgTW9kYWxWaWV3Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3BhZ2VzL21vZGFsLXZpZXcvbW9kYWwtdmlldy5jb21wb25lbnRcIjtcbmltcG9ydCB7IFRuc1NpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNpZGVkcmF3ZXJcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJjb25maWd1cmF0aW9uXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLmh0bWxcIixcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtNb2RhbFZpZXdDb21wb25lbnRdLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGNvbmZpZzogQ29uZmlndXJhdGlvbk1vZGVsO1xuXG4gICAgQFZpZXdDaGlsZChcIndpZmlTc2lkXCIpIHNzaWQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcInBhc3N3b3JkXCIpIHBhc3N3b3JkOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLCBcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsRGlhbG9nU2VydmljZSwgXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgICAgIFxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWd1cmF0aW9uTW9kZWwoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhZ2UuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKFwiIzRFMkM1MlwiKTtcblxuICAgICAgICB0aGlzLmNvbmZpZy53aWZpX3NzaWQgPSBhcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIndpZmlTU0lEXCIpO1xuICAgICAgICB0aGlzLmNvbmZpZy53aWZpX3Bhc3N3b3JkID0gYXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJ3aWZpUGFzc3dvcmRcIik7XG4gICAgICAgIHRoaXMuY29uZmlnLmxpY2VuY2VfbnVtYmVyID0gYXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJsaWNlbmNlTnVtYmVyXCIpO1xuXG4gICAgICAgIGlmICghdGhpcy5jb25maWcubGljZW5jZV9udW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcmVnaXN0ZXJcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIGFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwid2lmaVNTSURcIiwgdGhpcy5jb25maWcud2lmaV9zc2lkKTtcbiAgICAgICAgYXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJ3aWZpUGFzc3dvcmRcIiwgdGhpcy5jb25maWcud2lmaV9wYXNzd29yZCk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVNb2RhbFZpZXcoXCJDb25maWd1cmF0aW9uIFNhdmVkXCIsIFwiV2lmaSBTU0lEIGFuZCBQYXNzd29yZCBzYXZlZCAhXCIpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy53aWZpX3NzaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jb25maWd1cmF0aW9uXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL1wiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0pOyAgICAgICAgXG5cbiAgICAgICAgLy8gYXBwbGljYXRpb25TZXR0aW5ncy5jbGVhcigpO1xuICAgIH1cblxuICAgIG9wZW5EcmF3ZXIoKSB7XG4gICAgICAgIFRuc1NpZGVEcmF3ZXIudG9nZ2xlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVNb2RhbFZpZXcodGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXG4gICAgICAgICAgY29udGV4dDoge3RpdGxlOiB0aXRsZSwgbWVzc2FnZTogbWVzc2FnZX0sXG4gICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsICAgICAgXG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxWaWV3Q29tcG9uZW50LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHtcbiAgICAgICAgYWxlcnQoXCJFcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICB9XG59Il19