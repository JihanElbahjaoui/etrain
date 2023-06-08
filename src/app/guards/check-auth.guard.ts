import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isUserLoggedIn()) {
      this.snackBar.open('You are not allowed to view this page. You are redirected to home Page', 'OK');
      this.router.navigate([{ outlets: { primary: 'home', contenu: null } }]);
      return false;
    }
    return true;
  }

  constructor(private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

}
