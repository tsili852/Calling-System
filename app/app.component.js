"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var AppComponent = (function () {
    function AppComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        // TnsSideDrawer.build({
        //   templates: [{
        //     title: 'Validation',
        //     androidIcon: 'ic_verified_user_white_24dp',
        //     iosIcon: 'ic_verified_user_white'
        //   },{
        //     title: 'Wifi Configuration',
        //     androidIcon: 'ic_wifi_white_24dp',
        //     iosIcon: 'ic_wifi_white'
        //   },{
        //     title: 'Send to module',
        //     androidIcon: 'ic_send_white_24dp',
        //     iosIcon: 'ic_send_white'
        //   }],
        //   title: 'Calling System',
        //   backgroundColor: new Color("#4E2C52"),
        //   headerBackgroundColor: new Color("#7c607f"),
        //   context: this,
        //   listener: (index) => {
        //     switch(index) {
        //         case 0:
        //             this.routerExtensions.navigate(["/register"], { clearHistory: true });
        //             break;
        //         case 1:
        //             this.routerExtensions.navigate(["/configuration"], { clearHistory: true });
        //             break;
        //         case 2:
        //             this.routerExtensions.navigate(["/"], { clearHistory: true });
        //             break;
        //     }
        //   }
        // })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFHMUMsc0RBQStEO0FBTS9ELElBQWEsWUFBWTtJQUN2QixzQkFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDcEQsd0JBQXdCO1FBQ3hCLGtCQUFrQjtRQUNsQiwyQkFBMkI7UUFDM0Isa0RBQWtEO1FBQ2xELHdDQUF3QztRQUN4QyxRQUFRO1FBQ1IsbUNBQW1DO1FBQ25DLHlDQUF5QztRQUN6QywrQkFBK0I7UUFDL0IsUUFBUTtRQUNSLCtCQUErQjtRQUMvQix5Q0FBeUM7UUFDekMsK0JBQStCO1FBQy9CLFFBQVE7UUFDUiw2QkFBNkI7UUFDN0IsMkNBQTJDO1FBQzNDLGlEQUFpRDtRQUNqRCxtQkFBbUI7UUFDbkIsMkJBQTJCO1FBQzNCLHNCQUFzQjtRQUN0QixrQkFBa0I7UUFDbEIscUZBQXFGO1FBQ3JGLHFCQUFxQjtRQUNyQixrQkFBa0I7UUFDbEIsMEZBQTBGO1FBQzFGLHFCQUFxQjtRQUNyQixrQkFBa0I7UUFDbEIsNkVBQTZFO1FBQzdFLHFCQUFxQjtRQUNyQixRQUFRO1FBQ1IsTUFBTTtRQUNOLEtBQUs7SUFDUCxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDO0FBbkNZLFlBQVk7SUFKeEIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFFBQVEsRUFBRSwyQ0FBMkM7S0FDdEQsQ0FBQztxQ0FFc0MseUJBQWdCO0dBRDNDLFlBQVksQ0FtQ3hCO0FBbkNZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFRuc1NpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm1haW5cIixcbiAgdGVtcGxhdGU6IFwiPHBhZ2Utcm91dGVyLW91dGxldD48L3BhZ2Utcm91dGVyLW91dGxldD5cIlxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICAvLyBUbnNTaWRlRHJhd2VyLmJ1aWxkKHtcbiAgICAvLyAgIHRlbXBsYXRlczogW3tcbiAgICAvLyAgICAgdGl0bGU6ICdWYWxpZGF0aW9uJyxcbiAgICAvLyAgICAgYW5kcm9pZEljb246ICdpY192ZXJpZmllZF91c2VyX3doaXRlXzI0ZHAnLFxuICAgIC8vICAgICBpb3NJY29uOiAnaWNfdmVyaWZpZWRfdXNlcl93aGl0ZSdcbiAgICAvLyAgIH0se1xuICAgIC8vICAgICB0aXRsZTogJ1dpZmkgQ29uZmlndXJhdGlvbicsXG4gICAgLy8gICAgIGFuZHJvaWRJY29uOiAnaWNfd2lmaV93aGl0ZV8yNGRwJyxcbiAgICAvLyAgICAgaW9zSWNvbjogJ2ljX3dpZmlfd2hpdGUnXG4gICAgLy8gICB9LHtcbiAgICAvLyAgICAgdGl0bGU6ICdTZW5kIHRvIG1vZHVsZScsXG4gICAgLy8gICAgIGFuZHJvaWRJY29uOiAnaWNfc2VuZF93aGl0ZV8yNGRwJyxcbiAgICAvLyAgICAgaW9zSWNvbjogJ2ljX3NlbmRfd2hpdGUnXG4gICAgLy8gICB9XSxcbiAgICAvLyAgIHRpdGxlOiAnQ2FsbGluZyBTeXN0ZW0nLFxuICAgIC8vICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoXCIjNEUyQzUyXCIpLFxuICAgIC8vICAgaGVhZGVyQmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoXCIjN2M2MDdmXCIpLFxuICAgIC8vICAgY29udGV4dDogdGhpcyxcbiAgICAvLyAgIGxpc3RlbmVyOiAoaW5kZXgpID0+IHtcbiAgICAvLyAgICAgc3dpdGNoKGluZGV4KSB7XG4gICAgLy8gICAgICAgICBjYXNlIDA6XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9yZWdpc3RlclwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIDE6XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jb25maWd1cmF0aW9uXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgMjpcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL1wiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH1cbiAgICAvLyB9KVxuICB9XG59Il19