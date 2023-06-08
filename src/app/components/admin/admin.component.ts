import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/common/admin';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AdminAddEditComponent } from '../admin-add-edit/admin-add-edit.component';
import { Departement } from 'src/app/common/departement';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // departements: Departement[] = [];
  // admin: Admin = new Admin();


  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'action'];
  admins: Admin[] = [];
  searchMode: boolean = false;
  dataSource!: MatTableDataSource<any>;
  noRecordsFound!: boolean;



  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private adminService: AdminService,
    private dialog: MatDialog,
    private route: ActivatedRoute,


  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listAdmin();
    });
  }

  listAdmin() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchAdmin();
    }
    else {
      this.handleListAdmin();
    }

  }

  handleSearchAdmin() {
    const lastName: string = this.route.snapshot.paramMap.get('lastName')!;

    // now search for the admins using keyword
    this.adminService.searchAdmin(lastName).subscribe(
      data => {
        this.admins = data;
        this.dataSource = new MatTableDataSource(data);
        this.noRecordsFound = this.dataSource.data.length === 0;
      }
    )
  }

  handleListAdmin() {
    this.adminService.getAdminList().subscribe(
      (data: Admin[]) => {
        this.admins = data;
        this.dataSource = new MatTableDataSource(data);
        this.noRecordsFound = this.dataSource.data.length === 0;
        this.dataSource.paginator = this.paginator;
        console.log("data:", this.admins);
      },
      error => {
        console.log('Une erreur s\'est produite lors de la récupération des administrateurs.', error);
      }
    )
  }

  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // call method delete
        this.deleteAdmin(id);
      }
    });
  }

  openEditAdminModal(data: any): void {
    this.dialog.open(AdminAddEditComponent, {
      width: '540px',
      data,
    });
  }

  deleteAdmin(id: number): void {
    this.adminService.deleteAdmin(id).subscribe({
      next: (res) => {
        this.listAdmin();
      },
      error: console.log,
    })
  }

  // pour assigner chaque admin a une departement

  // fetchDepartments(): void {
  //   this.http.get<Departement[]>('/api/departements')
  //     .subscribe(departements => {
  //       this.departements = departements;
  //     });
  // }

  // addAdmin(): void {
  //   // Send the admin data including the departmentId to the backend
  //   this.http.post('/api/admins', this.admin)
  //     .subscribe(response => {
  //       // Handle the response
  //     });
  // }


}
