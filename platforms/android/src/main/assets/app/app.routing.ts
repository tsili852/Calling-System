import { ConnectComponent } from "./pages/connect/connect.component";
import { ModalViewComponent } from "./pages/modal-view/modal-view.component";

export const routes = [
  { path: "", component: ConnectComponent },
  { path: "modal", component: ModalViewComponent }
];

export const navigatableComponents = [
    ConnectComponent,
    ModalViewComponent
];