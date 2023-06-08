import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdminService} from "../../services/admin.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DepartementService} from "../../services/departement.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Admin} from "../../common/admin";

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent {
  password: string = '';
  adminForm!: FormGroup;
  passwordHidden: boolean = true;

  constructor(private _FormBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ConfirmPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private adminService: AdminService,
              private route: ActivatedRoute,
              private http: HttpClient,
              private departmentService: DepartementService,
              private tokenStorage: TokenStorageService
  ) {
    this.adminForm = this._FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dateBirth: ['', Validators.required],
      phone: ['', Validators.required],
      sexe: ['', Validators.required],
      password: ['', Validators.required],
      departement: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.adminForm.patchValue(this.data);
    this.generatePassword();
  }

  onFormSubmit(): void {
    // if (this.adminForm.valid) {
    if (this.data) {
      this.adminService.updateAdmin(this.data.id, this.adminForm.value).subscribe(
        response => {
          console.log('Admins updated');
          this.dialogRef.close(true);
        },
        error => {
          console.log('Error');
        }
      );
    }

    else {

      const adminData: Admin = {
        id: null,
        firstName: this.adminForm.value.firstName,
        lastName: this.adminForm.value.lastName,
        dateBirth: this.adminForm.value.dateBirth,
        phone: this.adminForm.value.phone,
        sexe: this.adminForm.value.sexe,
        photo: 'assets/images/profile/placeholder.png',
        email: this.adminForm.value.email,
        pw: this.adminForm.value.password,
        etat: true,
        departement_id: this.adminForm.value.departement.id,
        super_admin_id: this.tokenStorage.getId()
      };
      this.adminService.addAdmin(adminData).subscribe(
        response => {
          console.log('Admin added');
          //console.log(adminData);
          this.dialogRef.close(true);
        },
        error => {
          console.log('Error');
        }
      );
      console.log(adminData);
    }
    // }


  }

  generatePassword(): void {
    // Generate a random password
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.password = password;

    // Update the form control value
    this.adminForm.controls['password'].setValue(this.password);
  }

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }



}
