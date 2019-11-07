import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snack: MatSnackBar, private zone: NgZone) { }

  show(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snack-style'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = 2500;
    this.zone.run(() => this.snack.open(message, '❌', config));
  }

  showWithAction(message, actionText)
  {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snack-style'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = 2500;
    return this.snack.open(message, actionText, config);
  }
}
