import { Component, OnInit, NgModule } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { TextField } from "ui/text-field";
import { Page } from "ui/page";
import { ModalView } from '../../shared/modal/modal-view';

@Component({
    selector: "modal-view",
    templateUrl: "pages/modal-view/modal-view.html"
})
export class ModalViewComponent implements OnInit {
    modal: ModalView;

    constructor(private params: ModalDialogParams, private page: Page) {
        this.modal = new ModalView();
        this.modal.title = params.context.title;
        this.modal.message = params.context.message;

        this.page.on("unloaded", () => {
            this.params.closeCallback();
        });
    }

    ngOnInit() {

    }

    public modalTap() {        
        this.params.closeCallback();
    }
}