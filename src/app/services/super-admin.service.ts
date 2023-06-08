import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {SuperAdmin} from "../common/super-admin";
import {TokenStorageService} from "./token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  private API_URL = 'http://localhost:8080/api'; // Remplacez l'URL par l'API de votre backend

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getSuperAdminProfile(): Observable<any> {
    const id = this.tokenStorage.getId();
    return this.http.get(`${this.API_URL}/superadmin/${id}`, httpOptions);
  }

  updateSuperAdminProfile(superAdmin: any): Observable<any> {
    const id = this.tokenStorage.getId();
    return this.http.put(`${this.API_URL}/superadmin/${id}`, superAdmin, httpOptions);
  }

  uploadProfileImage(file: File): Observable<any> {
    const id = this.tokenStorage.getId();
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.API_URL}/superadmin/${id}/upload-image`, formData);
  }

}
