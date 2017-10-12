"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var page_1 = require("ui/page");
var modal_view_1 = require("../../shared/modal/modal-view");
var ModalViewComponent = (function () {
    function ModalViewComponent(params, page) {
        var _this = this;
        this.params = params;
        this.page = page;
        this.modal = new modal_view_1.ModalView();
        this.modal.title = params.context.title;
        this.modal.message = params.context.message;
        this.page.on("unloaded", function () {
            _this.params.closeCallback();
        });
    }
    ModalViewComponent.prototype.ngOnInit = function () {
    };
    ModalViewComponent.prototype.modalTap = function () {
        this.params.closeCallback();
    };
    return ModalViewComponent;
}());
ModalViewComponent = __decorate([
    core_1.Component({
        selector: "modal-view",
        templateUrl: "pages/modal-view/modal-view.html"
    }),
    __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams, page_1.Page])
], ModalViewComponent);
exports.ModalViewComponent = ModalViewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2RhbC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0RDtBQUM1RCxrRUFBc0U7QUFFdEUsZ0NBQStCO0FBQy9CLDREQUEwRDtBQU0xRCxJQUFhLGtCQUFrQjtJQUczQiw0QkFBb0IsTUFBeUIsRUFBVSxJQUFVO1FBQWpFLGlCQVFDO1FBUm1CLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUM3RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBRTVDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRTtZQUNyQixLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRU0scUNBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQXBCWSxrQkFBa0I7SUFKOUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFdBQVcsRUFBRSxrQ0FBa0M7S0FDbEQsQ0FBQztxQ0FJOEIsZ0NBQWlCLEVBQWdCLFdBQUk7R0FIeEQsa0JBQWtCLENBb0I5QjtBQXBCWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBNb2RhbFZpZXcgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kYWwvbW9kYWwtdmlldyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm1vZGFsLXZpZXdcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9tb2RhbC12aWV3L21vZGFsLXZpZXcuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgbW9kYWw6IE1vZGFsVmlldztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcywgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIHRoaXMubW9kYWwgPSBuZXcgTW9kYWxWaWV3KCk7XG4gICAgICAgIHRoaXMubW9kYWwudGl0bGUgPSBwYXJhbXMuY29udGV4dC50aXRsZTtcbiAgICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlID0gcGFyYW1zLmNvbnRleHQubWVzc2FnZTtcblxuICAgICAgICB0aGlzLnBhZ2Uub24oXCJ1bmxvYWRlZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIG1vZGFsVGFwKCkgeyAgICAgICAgXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcbiAgICB9XG59Il19