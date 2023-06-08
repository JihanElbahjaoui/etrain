import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {tap, switchMap, filter} from 'rxjs/operators';
import { SuperAdmin } from '../../common/super-admin';
import { SuperAdminService } from '../../services/super-admin.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ImageUploadService } from '../../services/image-upload.service';
import {TokenStorageService} from "../../services/token-storage.service";
import {ConfirmPasswordComponent} from "../confirm-password/confirm-password.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('inputField') inputField: any;
  profileForm: FormGroup;
  superAdmin: any;

  constructor(
    private formBuilder: FormBuilder,
    private superAdminService: SuperAdminService,
    private tokenStorage: TokenStorageService
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      DateBirth: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadSuperAdminProfile();
  }


  loadSuperAdminProfile() {
    this.superAdminService.getSuperAdminProfile().subscribe(
      (data: any) => {
        this.superAdmin = data;
        this.profileForm.patchValue(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadProfileImage(file);
  }

  uploadProfileImage(file: File) {
    this.superAdminService.uploadProfileImage(file).subscribe(
      (data: any) => {
        // Le téléchargement de l'image a réussi, vous pouvez mettre à jour l'image de profil ici si nécessaire.
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const superAdminData = this.profileForm.value;
      this.superAdminService.updateSuperAdminProfile(superAdminData).subscribe(
        (data: any) => {
          // Le profil du super administrateur a été mis à jour avec succès.
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}









