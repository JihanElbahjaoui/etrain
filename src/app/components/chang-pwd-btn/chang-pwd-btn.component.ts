import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DepartementAddEditComponent} from "../departement-add-edit/departement-add-edit.component";
import {ConfirmPasswordComponent} from "../confirm-password/confirm-password.component";

@Component({
  selector: 'app-chang-pwd-btn',
  templateUrl: './chang-pwd-btn.component.html',
  styleUrls: ['./chang-pwd-btn.component.css']
})
export class ChangPwdBtnComponent {

  constructor(private dialog: MatDialog) { }

  openConfirmPasswordModal(): void {
    const dialogRef = this.dialog.open(ConfirmPasswordComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
      else {
        console.log(result);
      }
    });
  }

}
