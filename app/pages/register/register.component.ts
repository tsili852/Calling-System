import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Page } from "ui/page";
import { Color } from "color";
import { TextField } from "ui/text-field";
import {  } from "module";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ModalViewComponent } from "../../pages/modal-view/modal-view.component";
import * as applicationSettings from "tns-core-modules/application-settings";
import { RouterExtensions } from 'nativescript-angular/router';
import { TnsSideDrawer } from "nativescript-sidedrawer";
import { ConfigurationModel } from '../../shared/configuration/configuration';

@Component({
    selector: "register",
    templateUrl: "pages/register/register.html",
    entryComponents: [ModalViewComponent],
    styleUrls: ["pages/register/register-common.css", "pages/register/register.css"]
})
export class RegisterComponent implements OnInit {
    config: ConfigurationModel;

    constructor(private routerExtensions: RouterExtensions,
        private page: Page,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef) {

        this.config = new ConfigurationModel();
    }

    ngOnInit() {
        this.page.actionBarHidden = false;
        this.page.backgroundColor = new Color("#4E2C52");

        this.config.wifi_ssid = applicationSettings.getString("wifiSSID");
        this.config.wifi_password = applicationSettings.getString("wifiPassword");
        this.config.licence_number = applicationSettings.getString("licenceNumber");
    }

    saveLicence() {
        applicationSettings.setString("licenceNumber", this.config.licence_number);

        this.createModalView("Welcome !", "You have been validated")
            .then(() => {
                this.routerExtensions.navigate(["/"], { clearHistory: true });
            })
            .catch((err) => {
                this.handleError(err);
            });        
    }

    openDrawer() {
        TnsSideDrawer.toggle();
    }

    private createModalView(title: string, message: string): Promise<any> {
        const options: ModalDialogOptions = {
          viewContainerRef: this.vcRef,
          context: {title: title, message: message},
          fullscreen: false,      
        };
    
        return this.modalService.showModal(ModalViewComponent, options);
    }

    private handleError(error: any) {
        alert("Error: " + error);
        console.dir(error);
    }
}