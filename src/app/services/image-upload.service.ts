import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {}

  uploadImage(image: File, path: string): Observable<string> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<{ imageUrl: string }>
    (`http://localhost:8080/api/superAdmins/upload`, formData)
      .pipe(map(response => response.imageUrl));
  }
}
