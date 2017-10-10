"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var color_1 = require("color");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var modal_view_component_1 = require("../../pages/modal-view/modal-view.component");
var applicationSettings = require("tns-core-modules/application-settings");
var router_1 = require("nativescript-angular/router");
var nativescript_sidedrawer_1 = require("nativescript-sidedrawer");
var configuration_1 = require("../../shared/configuration/configuration");
var RegisterComponent = (function () {
    function RegisterComponent(routerExtensions, page, modalService, vcRef) {
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.modalService = modalService;
        this.vcRef = vcRef;
        this.config = new configuration_1.ConfigurationModel();
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = false;
        this.page.backgroundColor = new color_1.Color("#4E2C52");
        this.config.wifi_ssid = applicationSettings.getString("wifiSSID");
        this.config.wifi_password = applicationSettings.getString("wifiPassword");
        this.config.licence_number = applicationSettings.getString("licenceNumber");
    };
    RegisterComponent.prototype.saveLicence = function () {
        var _this = this;
        applicationSettings.setString("licenceNumber", this.config.licence_number);
        this.createModalView("Welcome !", "You have been validated")
            .then(function () {
            _this.routerExtensions.navigate(["/"], { clearHistory: true });
        })
            .catch(function (err) {
            _this.handleError(err);
        });
    };
    RegisterComponent.prototype.openDrawer = function () {
        nativescript_sidedrawer_1.TnsSideDrawer.toggle();
    };
    RegisterComponent.prototype.createModalView = function (title, message) {
        var options = {
            viewContainerRef: this.vcRef,
            context: { title: title, message: message },
            fullscreen: false,
        };
        return this.modalService.showModal(modal_view_component_1.ModalViewComponent, options);
    };
    RegisterComponent.prototype.handleError = function (error) {
        alert("Error: " + error);
        console.dir(error);
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: "register",
        templateUrl: "pages/register/register.html",
        entryComponents: [modal_view_component_1.ModalViewComponent],
        styleUrls: ["pages/register/register-common.css", "pages/register/register.css"]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        page_1.Page,
        modal_dialog_1.ModalDialogService,
        core_1.ViewContainerRef])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLGdDQUErQjtBQUMvQiwrQkFBOEI7QUFHOUIsa0VBQTJGO0FBQzNGLG9GQUFpRjtBQUNqRiwyRUFBNkU7QUFDN0Usc0RBQStEO0FBQy9ELG1FQUF3RDtBQUV4RCwwRUFBOEU7QUFROUUsSUFBYSxpQkFBaUI7SUFHMUIsMkJBQW9CLGdCQUFrQyxFQUMxQyxJQUFVLEVBQ1YsWUFBZ0MsRUFDaEMsS0FBdUI7UUFIZixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzFDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFFL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFrQixFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFBQSxpQkFVQztRQVRHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUzRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSx5QkFBeUIsQ0FBQzthQUN2RCxJQUFJLENBQUM7WUFDRixLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxHQUFHO1lBQ1AsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxzQ0FBVSxHQUFWO1FBQ0ksdUNBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sMkNBQWUsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLE9BQWU7UUFDbEQsSUFBTSxPQUFPLEdBQXVCO1lBQ2xDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1lBQzVCLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQztZQUN6QyxVQUFVLEVBQUUsS0FBSztTQUNsQixDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLHlDQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTyx1Q0FBVyxHQUFuQixVQUFvQixLQUFVO1FBQzFCLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBbERELElBa0RDO0FBbERZLGlCQUFpQjtJQU43QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsV0FBVyxFQUFFLDhCQUE4QjtRQUMzQyxlQUFlLEVBQUUsQ0FBQyx5Q0FBa0IsQ0FBQztRQUNyQyxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRSw2QkFBNkIsQ0FBQztLQUNuRixDQUFDO3FDQUl3Qyx5QkFBZ0I7UUFDcEMsV0FBSTtRQUNJLGlDQUFrQjtRQUN6Qix1QkFBZ0I7R0FOMUIsaUJBQWlCLENBa0Q3QjtBQWxEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyAgfSBmcm9tIFwibW9kdWxlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBNb2RhbFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vcGFnZXMvbW9kYWwtdmlldy9tb2RhbC12aWV3LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBUbnNTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IHNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm1zL2FuZHJvaWQvYnVpbGQvaW50ZXJtZWRpYXRlcy9hc3NldHMvRjBGMUYyL2RlYnVnL2FwcC90bnNfbW9kdWxlcy9yeGpzL3NyYy9vcGVyYXRvci9wdWJsaXNoJztcclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcInJlZ2lzdGVyXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9yZWdpc3Rlci9yZWdpc3Rlci5odG1sXCIsXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtNb2RhbFZpZXdDb21wb25lbnRdLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9yZWdpc3Rlci9yZWdpc3Rlci1jb21tb24uY3NzXCIsIFwicGFnZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBjb25maWc6IENvbmZpZ3VyYXRpb25Nb2RlbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxyXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZikge1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWd1cmF0aW9uTW9kZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYWdlLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiM0RTJDNTJcIik7XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnLndpZmlfc3NpZCA9IGFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwid2lmaVNTSURcIik7XHJcbiAgICAgICAgdGhpcy5jb25maWcud2lmaV9wYXNzd29yZCA9IGFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwid2lmaVBhc3N3b3JkXCIpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLmxpY2VuY2VfbnVtYmVyID0gYXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJsaWNlbmNlTnVtYmVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVMaWNlbmNlKCkge1xyXG4gICAgICAgIGFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwibGljZW5jZU51bWJlclwiLCB0aGlzLmNvbmZpZy5saWNlbmNlX251bWJlcik7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlTW9kYWxWaWV3KFwiV2VsY29tZSAhXCIsIFwiWW91IGhhdmUgYmVlbiB2YWxpZGF0ZWRcIilcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9cIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB9KTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5EcmF3ZXIoKSB7XHJcbiAgICAgICAgVG5zU2lkZURyYXdlci50b2dnbGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZU1vZGFsVmlldyh0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcclxuICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXHJcbiAgICAgICAgICBjb250ZXh0OiB7dGl0bGU6IHRpdGxlLCBtZXNzYWdlOiBtZXNzYWdlfSxcclxuICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLCAgICAgIFxyXG4gICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKE1vZGFsVmlld0NvbXBvbmVudCwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KSB7XHJcbiAgICAgICAgYWxlcnQoXCJFcnJvcjogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xyXG4gICAgfVxyXG59Il19