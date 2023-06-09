import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/common/admin';
import { AdminService } from 'src/app/services/admin.service';
import { DepartementService } from 'src/app/services/departement.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin-add-edit',
  templateUrl: './admin-add-edit.component.html',
  styleUrls: ['./admin-add-edit.component.css']
})
export class AdminAddEditComponent {

  departements: any[] = [];
  password: string = '';
  adminForm!: FormGroup;
  passwordHidden: boolean = true;

  constructor(private _FormBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AdminAddEditComponent>,
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
    this.fetchDepartments();
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

  fetchDepartments(): void {
    this.departmentService.getDepartementList()
      .subscribe(departements => {

        this.departements = departements;
       // console.log(departements);
      },
        error => {
          console.log('Error occurred while loading departments:', error);
        }
      );
  }
}
