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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2RhbC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0RDtBQUM1RCxrRUFBc0U7QUFFdEUsZ0NBQStCO0FBQy9CLDREQUEwRDtBQU0xRCxJQUFhLGtCQUFrQjtJQUczQiw0QkFBb0IsTUFBeUIsRUFBVSxJQUFVO1FBQWpFLGlCQVFDO1FBUm1CLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUM3RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBRTVDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRTtZQUNyQixLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRU0scUNBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQXBCWSxrQkFBa0I7SUFKOUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFdBQVcsRUFBRSxrQ0FBa0M7S0FDbEQsQ0FBQztxQ0FJOEIsZ0NBQWlCLEVBQWdCLFdBQUk7R0FIeEQsa0JBQWtCLENBb0I5QjtBQXBCWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IE1vZGFsVmlldyB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RhbC9tb2RhbC12aWV3JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibW9kYWwtdmlld1wiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvbW9kYWwtdmlldy9tb2RhbC12aWV3Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgTW9kYWxWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIG1vZGFsOiBNb2RhbFZpZXc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLCBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcclxuICAgICAgICB0aGlzLm1vZGFsID0gbmV3IE1vZGFsVmlldygpO1xyXG4gICAgICAgIHRoaXMubW9kYWwudGl0bGUgPSBwYXJhbXMuY29udGV4dC50aXRsZTtcclxuICAgICAgICB0aGlzLm1vZGFsLm1lc3NhZ2UgPSBwYXJhbXMuY29udGV4dC5tZXNzYWdlO1xyXG5cclxuICAgICAgICB0aGlzLnBhZ2Uub24oXCJ1bmxvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vZGFsVGFwKCkgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgfVxyXG59Il19