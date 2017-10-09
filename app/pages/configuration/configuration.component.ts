import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { TextField } from "ui/text-field";
import { ConfigurationModel } from "../../shared/configuration/configuration";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ModalViewComponent } from "../../pages/modal-view/modal-view.component";
import * as applicationSettings from "tns-core-modules/application-settings";

@Component({
    selector: "configuration",
    templateUrl: "pages/configuration/configuration.html",
    entryComponents: [ModalViewComponent],
    styleUrls: ["pages/configuration/configuration-common.css", "pages/configuration/configuration.css"]
})
export class ConfigurationComponent implements OnInit {
    config: ConfigurationModel;

    @ViewChild("wifiSsid") ssid: ElementRef;
    @ViewChild("password") password: ElementRef;

    constructor(private router: Router, private page: Page, private modalService: ModalDialogService, private vcRef: ViewContainerRef) {
        this.config = new ConfigurationModel();
    }

    ngOnInit() {
        this.page.actionBarHidden = false;
        this.page.backgroundColor = new Color("#4E2C52");

        this.config.wifi_ssid = applicationSettings.getString("wifiSSID");
        this.config.wifi_password = applicationSettings.getString("wifiPassword");
    }

    saveConfiguration() {
        applicationSettings.setString("wifiSSID", this.config.wifi_ssid);
        applicationSettings.setString("wifiPassword", this.config.wifi_password);

        this.createModalView("Configuration Saved", "Wifi SSID and Password saved !")
            .then(() => {
                this.router.navigate(["/"]);
            })
            .catch((err) => {
                this.handleError(err);
            });        

        // applicationSettings.clear();
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