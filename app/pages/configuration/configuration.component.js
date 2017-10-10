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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWd1cmF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUMzRixnQ0FBK0I7QUFDL0IsK0JBQThCO0FBRzlCLDBFQUE4RTtBQUM5RSxrRUFBMkY7QUFDM0Ysb0ZBQWlGO0FBQ2pGLG1FQUF3RDtBQUN4RCwyRUFBNkU7QUFDN0Usc0RBQStEO0FBUS9ELElBQWEsc0JBQXNCO0lBTS9CLGdDQUFvQixnQkFBa0MsRUFDMUMsSUFBVSxFQUNWLFlBQWdDLEVBQ2hDLEtBQXVCO1FBSGYscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUMxQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBRS9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQ0FBa0IsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCx5Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTVFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLENBQUM7SUFDTCxDQUFDO0lBRUQsa0RBQWlCLEdBQWpCO1FBQUEsaUJBaUJDO1FBaEJHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRSxnQ0FBZ0MsQ0FBQzthQUN4RSxJQUFJLENBQUM7WUFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMvRSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEUsQ0FBQztRQUNMLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLEdBQUc7WUFDUCxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBRVAsK0JBQStCO0lBQ25DLENBQUM7SUFFRCwyQ0FBVSxHQUFWO1FBQ0ksdUNBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sZ0RBQWUsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLE9BQWU7UUFDbEQsSUFBTSxPQUFPLEdBQXVCO1lBQ2xDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1lBQzVCLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQztZQUN6QyxVQUFVLEVBQUUsS0FBSztTQUNsQixDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLHlDQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTyw0Q0FBVyxHQUFuQixVQUFvQixLQUFVO1FBQzFCLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBaEVELElBZ0VDO0FBN0QwQjtJQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQzs4QkFBTyxpQkFBVTtvREFBQztBQUNqQjtJQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQzs4QkFBVyxpQkFBVTt3REFBQztBQUpuQyxzQkFBc0I7SUFObEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFdBQVcsRUFBRSx3Q0FBd0M7UUFDckQsZUFBZSxFQUFFLENBQUMseUNBQWtCLENBQUM7UUFDckMsU0FBUyxFQUFFLENBQUMsOENBQThDLEVBQUUsdUNBQXVDLENBQUM7S0FDdkcsQ0FBQztxQ0FPd0MseUJBQWdCO1FBQ3BDLFdBQUk7UUFDSSxpQ0FBa0I7UUFDekIsdUJBQWdCO0dBVDFCLHNCQUFzQixDQWdFbEM7QUFoRVksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgQWN0aW9uSXRlbSB9IGZyb20gXCJ1aS9hY3Rpb24tYmFyXCI7XHJcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25Nb2RlbCB9IGZyb20gXCIuLi8uLi9zaGFyZWQvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBNb2RhbFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vcGFnZXMvbW9kYWwtdmlldy9tb2RhbC12aWV3LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBUbnNTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImNvbmZpZ3VyYXRpb25cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5odG1sXCIsXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtNb2RhbFZpZXdDb21wb25lbnRdLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24tY29tbW9uLmNzc1wiLCBcInBhZ2VzL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgY29uZmlnOiBDb25maWd1cmF0aW9uTW9kZWw7XHJcblxyXG4gICAgQFZpZXdDaGlsZChcIndpZmlTc2lkXCIpIHNzaWQ6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwicGFzc3dvcmRcIikgcGFzc3dvcmQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsIFxyXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsIFxyXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgQ29uZmlndXJhdGlvbk1vZGVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjNEUyQzUyXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZy53aWZpX3NzaWQgPSBhcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIndpZmlTU0lEXCIpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLndpZmlfcGFzc3dvcmQgPSBhcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIndpZmlQYXNzd29yZFwiKTtcclxuICAgICAgICB0aGlzLmNvbmZpZy5saWNlbmNlX251bWJlciA9IGFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwibGljZW5jZU51bWJlclwiKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5saWNlbmNlX251bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3JlZ2lzdGVyXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUNvbmZpZ3VyYXRpb24oKSB7XHJcbiAgICAgICAgYXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJ3aWZpU1NJRFwiLCB0aGlzLmNvbmZpZy53aWZpX3NzaWQpO1xyXG4gICAgICAgIGFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwid2lmaVBhc3N3b3JkXCIsIHRoaXMuY29uZmlnLndpZmlfcGFzc3dvcmQpO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZU1vZGFsVmlldyhcIkNvbmZpZ3VyYXRpb24gU2F2ZWRcIiwgXCJXaWZpIFNTSUQgYW5kIFBhc3N3b3JkIHNhdmVkICFcIilcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy53aWZpX3NzaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NvbmZpZ3VyYXRpb25cIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL1wiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB9KTsgICAgICAgIFxyXG5cclxuICAgICAgICAvLyBhcHBsaWNhdGlvblNldHRpbmdzLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbkRyYXdlcigpIHtcclxuICAgICAgICBUbnNTaWRlRHJhd2VyLnRvZ2dsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlTW9kYWxWaWV3KHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xyXG4gICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcclxuICAgICAgICAgIGNvbnRleHQ6IHt0aXRsZTogdGl0bGUsIG1lc3NhZ2U6IG1lc3NhZ2V9LFxyXG4gICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxWaWV3Q29tcG9uZW50LCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHtcclxuICAgICAgICBhbGVydChcIkVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XHJcbiAgICB9XHJcbn0iXX0=