"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connect_component_1 = require("./pages/connect/connect.component");
var modal_view_component_1 = require("./pages/modal-view/modal-view.component");
var configuration_component_1 = require("./pages/configuration/configuration.component");
var register_component_1 = require("./pages/register/register.component");
exports.routes = [
    { path: "", redirectTo: "/connect", pathMatch: "full" },
    { path: "register", component: register_component_1.RegisterComponent },
    { path: "connect", component: connect_component_1.ConnectComponent },
    { path: "modal", component: modal_view_component_1.ModalViewComponent },
    { path: "configuration", component: configuration_component_1.ConfigurationComponent }
];
exports.navigatableComponents = [
    connect_component_1.ConnectComponent,
    modal_view_component_1.ModalViewComponent,
    configuration_component_1.ConfigurationComponent,
    register_component_1.RegisterComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVFQUFxRTtBQUNyRSxnRkFBNkU7QUFDN0UseUZBQXVGO0FBQ3ZGLDBFQUF3RTtBQUUzRCxRQUFBLE1BQU0sR0FBRztJQUNwQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFDO0lBQ3JELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsc0NBQWlCLEVBQUU7SUFDbEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxvQ0FBZ0IsRUFBRTtJQUNoRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLHlDQUFrQixFQUFFO0lBQ2hELEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsZ0RBQXNCLEVBQUU7Q0FFN0QsQ0FBQztBQUVXLFFBQUEscUJBQXFCLEdBQUc7SUFDakMsb0NBQWdCO0lBQ2hCLHlDQUFrQjtJQUNsQixnREFBc0I7SUFDdEIsc0NBQWlCO0NBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25uZWN0Q29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvY29ubmVjdC9jb25uZWN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNb2RhbFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9tb2RhbC12aWV3L21vZGFsLXZpZXcuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25Db21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IFtcclxuICB7IHBhdGg6IFwiXCIsIHJlZGlyZWN0VG86XCIvY29ubmVjdFwiLCBwYXRoTWF0Y2g6IFwiZnVsbFwifSxcclxuICB7IHBhdGg6IFwicmVnaXN0ZXJcIiwgY29tcG9uZW50OiBSZWdpc3RlckNvbXBvbmVudCB9LFxyXG4gIHsgcGF0aDogXCJjb25uZWN0XCIsIGNvbXBvbmVudDogQ29ubmVjdENvbXBvbmVudCB9LFxyXG4gIHsgcGF0aDogXCJtb2RhbFwiLCBjb21wb25lbnQ6IE1vZGFsVmlld0NvbXBvbmVudCB9LFxyXG4gIHsgcGF0aDogXCJjb25maWd1cmF0aW9uXCIsIGNvbXBvbmVudDogQ29uZmlndXJhdGlvbkNvbXBvbmVudCB9XHJcbiAgXHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgbmF2aWdhdGFibGVDb21wb25lbnRzID0gW1xyXG4gICAgQ29ubmVjdENvbXBvbmVudCxcclxuICAgIE1vZGFsVmlld0NvbXBvbmVudCxcclxuICAgIENvbmZpZ3VyYXRpb25Db21wb25lbnQsXHJcbiAgICBSZWdpc3RlckNvbXBvbmVudFxyXG5dOyJdfQ==