"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var color_1 = require("color");
var configuration_1 = require("../../shared/configuration/configuration");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var modal_view_component_1 = require("../../pages/modal-view/modal-view.component");
var applicationSettings = require("tns-core-modules/application-settings");
var ConfigurationComponent = (function () {
    function ConfigurationComponent(router, page, modalService, vcRef) {
        this.router = router;
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
    };
    ConfigurationComponent.prototype.saveConfiguration = function () {
        var _this = this;
        applicationSettings.setString("wifiSSID", this.config.wifi_ssid);
        applicationSettings.setString("wifiPassword", this.config.wifi_password);
        this.createModalView("Configuration Saved", "Wifi SSID and Password saved !")
            .then(function () {
            _this.router.navigate(["/"]);
        })
            .catch(function (err) {
            _this.handleError(err);
        });
        // applicationSettings.clear();
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
    __metadata("design:paramtypes", [router_1.Router, page_1.Page, modal_dialog_1.ModalDialogService, core_1.ViewContainerRef])
], ConfigurationComponent);
exports.ConfigurationComponent = ConfigurationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWd1cmF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUMzRiwwQ0FBeUM7QUFDekMsZ0NBQStCO0FBQy9CLCtCQUE4QjtBQUU5QiwwRUFBOEU7QUFDOUUsa0VBQTJGO0FBQzNGLG9GQUFpRjtBQUNqRiwyRUFBNkU7QUFRN0UsSUFBYSxzQkFBc0I7SUFNL0IsZ0NBQW9CLE1BQWMsRUFBVSxJQUFVLEVBQVUsWUFBZ0MsRUFBVSxLQUF1QjtRQUE3RyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQzdILElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQ0FBa0IsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCx5Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELGtEQUFpQixHQUFqQjtRQUFBLGlCQWFDO1FBWkcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pFLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV6RSxJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixFQUFFLGdDQUFnQyxDQUFDO2FBQ3hFLElBQUksQ0FBQztZQUNGLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxHQUFHO1lBQ1AsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUVQLCtCQUErQjtJQUNuQyxDQUFDO0lBRU8sZ0RBQWUsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLE9BQWU7UUFDbEQsSUFBTSxPQUFPLEdBQXVCO1lBQ2xDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1lBQzVCLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQztZQUN6QyxVQUFVLEVBQUUsS0FBSztTQUNsQixDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLHlDQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTyw0Q0FBVyxHQUFuQixVQUFvQixLQUFVO1FBQzFCLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBL0NELElBK0NDO0FBNUMwQjtJQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQzs4QkFBTyxpQkFBVTtvREFBQztBQUNqQjtJQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQzs4QkFBVyxpQkFBVTt3REFBQztBQUpuQyxzQkFBc0I7SUFObEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFdBQVcsRUFBRSx3Q0FBd0M7UUFDckQsZUFBZSxFQUFFLENBQUMseUNBQWtCLENBQUM7UUFDckMsU0FBUyxFQUFFLENBQUMsOENBQThDLEVBQUUsdUNBQXVDLENBQUM7S0FDdkcsQ0FBQztxQ0FPOEIsZUFBTSxFQUFnQixXQUFJLEVBQXdCLGlDQUFrQixFQUFpQix1QkFBZ0I7R0FOeEgsc0JBQXNCLENBK0NsQztBQS9DWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25Nb2RlbCB9IGZyb20gXCIuLi8uLi9zaGFyZWQvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBNb2RhbFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vcGFnZXMvbW9kYWwtdmlldy9tb2RhbC12aWV3LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImNvbmZpZ3VyYXRpb25cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5odG1sXCIsXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtNb2RhbFZpZXdDb21wb25lbnRdLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24tY29tbW9uLmNzc1wiLCBcInBhZ2VzL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgY29uZmlnOiBDb25maWd1cmF0aW9uTW9kZWw7XHJcblxyXG4gICAgQFZpZXdDaGlsZChcIndpZmlTc2lkXCIpIHNzaWQ6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwicGFzc3dvcmRcIikgcGFzc3dvcmQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgQ29uZmlndXJhdGlvbk1vZGVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjNEUyQzUyXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZy53aWZpX3NzaWQgPSBhcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIndpZmlTU0lEXCIpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLndpZmlfcGFzc3dvcmQgPSBhcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIndpZmlQYXNzd29yZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlQ29uZmlndXJhdGlvbigpIHtcclxuICAgICAgICBhcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIndpZmlTU0lEXCIsIHRoaXMuY29uZmlnLndpZmlfc3NpZCk7XHJcbiAgICAgICAgYXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJ3aWZpUGFzc3dvcmRcIiwgdGhpcy5jb25maWcud2lmaV9wYXNzd29yZCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlTW9kYWxWaWV3KFwiQ29uZmlndXJhdGlvbiBTYXZlZFwiLCBcIldpZmkgU1NJRCBhbmQgUGFzc3dvcmQgc2F2ZWQgIVwiKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvXCJdKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgfSk7ICAgICAgICBcclxuXHJcbiAgICAgICAgLy8gYXBwbGljYXRpb25TZXR0aW5ncy5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlTW9kYWxWaWV3KHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xyXG4gICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcclxuICAgICAgICAgIGNvbnRleHQ6IHt0aXRsZTogdGl0bGUsIG1lc3NhZ2U6IG1lc3NhZ2V9LFxyXG4gICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxWaWV3Q29tcG9uZW50LCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHtcclxuICAgICAgICBhbGVydChcIkVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XHJcbiAgICB9XHJcbn0iXX0=