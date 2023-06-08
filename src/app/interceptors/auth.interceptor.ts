import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérer le jeton d'authentification depuis le stockage local
    const token = this.tokenStorage.getTokenValue;

    // Vérifier si le jeton existe
    if (token) {
      // Cloner la requête et ajouter le jeton dans l'en-tête Authorization
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      // Transmettre la requête modifiée à la prochaine étape du gestionnaire
      return next.handle(modifiedRequest);
    }

    // Si le jeton n'existe pas, transmettre simplement la requête d'origine
    return next.handle(request);
  }
}
