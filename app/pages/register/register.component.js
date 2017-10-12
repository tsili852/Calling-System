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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLGdDQUErQjtBQUMvQiwrQkFBOEI7QUFHOUIsa0VBQTJGO0FBQzNGLG9GQUFpRjtBQUNqRiwyRUFBNkU7QUFDN0Usc0RBQStEO0FBQy9ELG1FQUF3RDtBQUN4RCwwRUFBOEU7QUFROUUsSUFBYSxpQkFBaUI7SUFHMUIsMkJBQW9CLGdCQUFrQyxFQUMxQyxJQUFVLEVBQ1YsWUFBZ0MsRUFDaEMsS0FBdUI7UUFIZixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzFDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFFL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFrQixFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFBQSxpQkFVQztRQVRHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUzRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSx5QkFBeUIsQ0FBQzthQUN2RCxJQUFJLENBQUM7WUFDRixLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxHQUFHO1lBQ1AsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxzQ0FBVSxHQUFWO1FBQ0ksdUNBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sMkNBQWUsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLE9BQWU7UUFDbEQsSUFBTSxPQUFPLEdBQXVCO1lBQ2xDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1lBQzVCLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQztZQUN6QyxVQUFVLEVBQUUsS0FBSztTQUNsQixDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLHlDQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTyx1Q0FBVyxHQUFuQixVQUFvQixLQUFVO1FBQzFCLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBbERELElBa0RDO0FBbERZLGlCQUFpQjtJQU43QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsV0FBVyxFQUFFLDhCQUE4QjtRQUMzQyxlQUFlLEVBQUUsQ0FBQyx5Q0FBa0IsQ0FBQztRQUNyQyxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRSw2QkFBNkIsQ0FBQztLQUNuRixDQUFDO3FDQUl3Qyx5QkFBZ0I7UUFDcEMsV0FBSTtRQUNJLGlDQUFrQjtRQUN6Qix1QkFBZ0I7R0FOMUIsaUJBQWlCLENBa0Q3QjtBQWxEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgIH0gZnJvbSBcIm1vZHVsZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlLCBNb2RhbERpYWxvZ09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBNb2RhbFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vcGFnZXMvbW9kYWwtdmlldy9tb2RhbC12aWV3LmNvbXBvbmVudFwiO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUbnNTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicmVnaXN0ZXJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9yZWdpc3Rlci9yZWdpc3Rlci5odG1sXCIsXG4gICAgZW50cnlDb21wb25lbnRzOiBbTW9kYWxWaWV3Q29tcG9uZW50XSxcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9yZWdpc3Rlci9yZWdpc3Rlci5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGNvbmZpZzogQ29uZmlndXJhdGlvbk1vZGVsO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcblxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWd1cmF0aW9uTW9kZWwoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhZ2UuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKFwiIzRFMkM1MlwiKTtcblxuICAgICAgICB0aGlzLmNvbmZpZy53aWZpX3NzaWQgPSBhcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIndpZmlTU0lEXCIpO1xuICAgICAgICB0aGlzLmNvbmZpZy53aWZpX3Bhc3N3b3JkID0gYXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJ3aWZpUGFzc3dvcmRcIik7XG4gICAgICAgIHRoaXMuY29uZmlnLmxpY2VuY2VfbnVtYmVyID0gYXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJsaWNlbmNlTnVtYmVyXCIpO1xuICAgIH1cblxuICAgIHNhdmVMaWNlbmNlKCkge1xuICAgICAgICBhcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImxpY2VuY2VOdW1iZXJcIiwgdGhpcy5jb25maWcubGljZW5jZV9udW1iZXIpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlTW9kYWxWaWV3KFwiV2VsY29tZSAhXCIsIFwiWW91IGhhdmUgYmVlbiB2YWxpZGF0ZWRcIilcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL1wiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycik7XG4gICAgICAgICAgICB9KTsgICAgICAgIFxuICAgIH1cblxuICAgIG9wZW5EcmF3ZXIoKSB7XG4gICAgICAgIFRuc1NpZGVEcmF3ZXIudG9nZ2xlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVNb2RhbFZpZXcodGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXG4gICAgICAgICAgY29udGV4dDoge3RpdGxlOiB0aXRsZSwgbWVzc2FnZTogbWVzc2FnZX0sXG4gICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsICAgICAgXG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxWaWV3Q29tcG9uZW50LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHtcbiAgICAgICAgYWxlcnQoXCJFcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICB9XG59Il19