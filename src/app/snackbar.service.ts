import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ModalComponent } from './modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(public snack: MatSnackBar, private zone: NgZone, public modal: ModalComponent) { }

  show(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snack-style'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2500;
    this.zone.run(() => this.snack.open(message, '❌', config));
  }

  showWithAction(message, actionText)
  {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snack-style'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2500;
    return this.snack.open(message, actionText, config);
  }

  showModal(id)
  {
    this.modal.showModal(id);
  }
}
