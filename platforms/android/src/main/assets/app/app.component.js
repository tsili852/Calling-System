"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_sidedrawer_1 = require("nativescript-sidedrawer");
var color_1 = require("color");
var router_1 = require("nativescript-angular/router");
var AppComponent = (function () {
    function AppComponent(routerExtensions) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        nativescript_sidedrawer_1.TnsSideDrawer.build({
            templates: [{
                    title: 'Wifi Configuration',
                    androidIcon: 'ic_wifi_white_24dp',
                    iosIcon: 'ic_wifi_white'
                }, {
                    title: 'Send to module',
                    androidIcon: 'ic_send_white_24dp',
                    iosIcon: 'ic_send_white'
                }],
            title: 'Calling System',
            backgroundColor: new color_1.Color("#4E2C52"),
            headerBackgroundColor: new color_1.Color("#7c607f"),
            context: this,
            listener: function (index) {
                switch (index) {
                    case 0:
                        _this.routerExtensions.navigate(["/configuration"], { clearHistory: true });
                        break;
                    case 1:
                        _this.routerExtensions.navigate(["/"], { clearHistory: true });
                        break;
                }
            }
        });
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "main",
        template: "<page-router-outlet></page-router-outlet>"
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsbUVBQXdEO0FBQ3hELCtCQUE4QjtBQUM5QixzREFBK0Q7QUFNL0QsSUFBYSxZQUFZO0lBQ3ZCLHNCQUFvQixnQkFBa0M7UUFBdEQsaUJBMEJDO1FBMUJtQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ3BELHVDQUFhLENBQUMsS0FBSyxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxDQUFDO29CQUNSLEtBQUssRUFBRSxvQkFBb0I7b0JBQzNCLFdBQVcsRUFBRSxvQkFBb0I7b0JBQ2pDLE9BQU8sRUFBRSxlQUFlO2lCQUMzQixFQUFDO29CQUNFLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLFdBQVcsRUFBRSxvQkFBb0I7b0JBQ2pDLE9BQU8sRUFBRSxlQUFlO2lCQUMzQixDQUFDO1lBQ0YsS0FBSyxFQUFFLGdCQUFnQjtZQUN2QixlQUFlLEVBQUUsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3JDLHFCQUFxQixFQUFFLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQztZQUMzQyxPQUFPLEVBQUUsSUFBSTtZQUNiLFFBQVEsRUFBRSxVQUFDLEtBQUs7Z0JBQ1osTUFBTSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDWCxLQUFLLENBQUM7d0JBQ0YsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDM0UsS0FBSyxDQUFDO29CQUNWLEtBQUssQ0FBQzt3QkFDRixLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDOUQsS0FBSyxDQUFDO2dCQUNkLENBQUM7WUFDTCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQztBQTVCWSxZQUFZO0lBSnhCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsTUFBTTtRQUNoQixRQUFRLEVBQUUsMkNBQTJDO0tBQ3RELENBQUM7cUNBRXNDLHlCQUFnQjtHQUQzQyxZQUFZLENBNEJ4QjtBQTVCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBUbnNTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJtYWluXCIsXG4gIHRlbXBsYXRlOiBcIjxwYWdlLXJvdXRlci1vdXRsZXQ+PC9wYWdlLXJvdXRlci1vdXRsZXQ+XCJcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XG4gICAgVG5zU2lkZURyYXdlci5idWlsZCh7XG4gICAgICB0ZW1wbGF0ZXM6IFt7XG4gICAgICAgICAgdGl0bGU6ICdXaWZpIENvbmZpZ3VyYXRpb24nLFxuICAgICAgICAgIGFuZHJvaWRJY29uOiAnaWNfd2lmaV93aGl0ZV8yNGRwJyxcbiAgICAgICAgICBpb3NJY29uOiAnaWNfd2lmaV93aGl0ZSdcbiAgICAgIH0se1xuICAgICAgICAgIHRpdGxlOiAnU2VuZCB0byBtb2R1bGUnLFxuICAgICAgICAgIGFuZHJvaWRJY29uOiAnaWNfc2VuZF93aGl0ZV8yNGRwJyxcbiAgICAgICAgICBpb3NJY29uOiAnaWNfc2VuZF93aGl0ZSdcbiAgICAgIH1dLFxuICAgICAgdGl0bGU6ICdDYWxsaW5nIFN5c3RlbScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcihcIiM0RTJDNTJcIiksXG4gICAgICBoZWFkZXJCYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcihcIiM3YzYwN2ZcIiksXG4gICAgICBjb250ZXh0OiB0aGlzLFxuICAgICAgbGlzdGVuZXI6IChpbmRleCkgPT4ge1xuICAgICAgICAgIHN3aXRjaChpbmRleCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NvbmZpZ3VyYXRpb25cIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG59Il19