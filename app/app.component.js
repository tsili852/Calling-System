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
                    title: 'Validation',
                    androidIcon: 'ic_verified_user_white_24dp',
                    iosIcon: 'ic_verified_user_white'
                }, {
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
                        _this.routerExtensions.navigate(["/register"], { clearHistory: true });
                        break;
                    case 1:
                        _this.routerExtensions.navigate(["/configuration"], { clearHistory: true });
                        break;
                    case 2:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsbUVBQXdEO0FBQ3hELCtCQUE4QjtBQUM5QixzREFBK0Q7QUFNL0QsSUFBYSxZQUFZO0lBQ3ZCLHNCQUFvQixnQkFBa0M7UUFBdEQsaUJBaUNDO1FBakNtQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ3BELHVDQUFhLENBQUMsS0FBSyxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxDQUFDO29CQUNWLEtBQUssRUFBRSxZQUFZO29CQUNuQixXQUFXLEVBQUUsNkJBQTZCO29CQUMxQyxPQUFPLEVBQUUsd0JBQXdCO2lCQUNsQyxFQUFDO29CQUNBLEtBQUssRUFBRSxvQkFBb0I7b0JBQzNCLFdBQVcsRUFBRSxvQkFBb0I7b0JBQ2pDLE9BQU8sRUFBRSxlQUFlO2lCQUN6QixFQUFDO29CQUNBLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLFdBQVcsRUFBRSxvQkFBb0I7b0JBQ2pDLE9BQU8sRUFBRSxlQUFlO2lCQUN6QixDQUFDO1lBQ0YsS0FBSyxFQUFFLGdCQUFnQjtZQUN2QixlQUFlLEVBQUUsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3JDLHFCQUFxQixFQUFFLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQztZQUMzQyxPQUFPLEVBQUUsSUFBSTtZQUNiLFFBQVEsRUFBRSxVQUFDLEtBQUs7Z0JBQ2QsTUFBTSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDWCxLQUFLLENBQUM7d0JBQ0YsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ3RFLEtBQUssQ0FBQztvQkFDVixLQUFLLENBQUM7d0JBQ0YsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDM0UsS0FBSyxDQUFDO29CQUNWLEtBQUssQ0FBQzt3QkFDRixLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDOUQsS0FBSyxDQUFDO2dCQUNkLENBQUM7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQW5DWSxZQUFZO0lBSnhCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsTUFBTTtRQUNoQixRQUFRLEVBQUUsMkNBQTJDO0tBQ3RELENBQUM7cUNBRXNDLHlCQUFnQjtHQUQzQyxZQUFZLENBbUN4QjtBQW5DWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBUbnNTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJtYWluXCIsXG4gIHRlbXBsYXRlOiBcIjxwYWdlLXJvdXRlci1vdXRsZXQ+PC9wYWdlLXJvdXRlci1vdXRsZXQ+XCJcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XG4gICAgVG5zU2lkZURyYXdlci5idWlsZCh7XG4gICAgICB0ZW1wbGF0ZXM6IFt7XG4gICAgICAgIHRpdGxlOiAnVmFsaWRhdGlvbicsXG4gICAgICAgIGFuZHJvaWRJY29uOiAnaWNfdmVyaWZpZWRfdXNlcl93aGl0ZV8yNGRwJyxcbiAgICAgICAgaW9zSWNvbjogJ2ljX3ZlcmlmaWVkX3VzZXJfd2hpdGUnXG4gICAgICB9LHtcbiAgICAgICAgdGl0bGU6ICdXaWZpIENvbmZpZ3VyYXRpb24nLFxuICAgICAgICBhbmRyb2lkSWNvbjogJ2ljX3dpZmlfd2hpdGVfMjRkcCcsXG4gICAgICAgIGlvc0ljb246ICdpY193aWZpX3doaXRlJ1xuICAgICAgfSx7XG4gICAgICAgIHRpdGxlOiAnU2VuZCB0byBtb2R1bGUnLFxuICAgICAgICBhbmRyb2lkSWNvbjogJ2ljX3NlbmRfd2hpdGVfMjRkcCcsXG4gICAgICAgIGlvc0ljb246ICdpY19zZW5kX3doaXRlJ1xuICAgICAgfV0sXG4gICAgICB0aXRsZTogJ0NhbGxpbmcgU3lzdGVtJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKFwiIzRFMkM1MlwiKSxcbiAgICAgIGhlYWRlckJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKFwiIzdjNjA3ZlwiKSxcbiAgICAgIGNvbnRleHQ6IHRoaXMsXG4gICAgICBsaXN0ZW5lcjogKGluZGV4KSA9PiB7XG4gICAgICAgIHN3aXRjaChpbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcmVnaXN0ZXJcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY29uZmlndXJhdGlvblwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9cIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxufSJdfQ==