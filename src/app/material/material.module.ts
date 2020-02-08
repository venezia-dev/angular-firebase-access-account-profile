import { NgModule } from '@angular/core'; 

import {
  MatButtonModule, 
  MatCardModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatTooltipModule,
  MatListModule,
  MatToolbarModule, 
  MatSidenavModule,
  MatMenuModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, 
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatListModule,
    MatToolbarModule, 
    MatSidenavModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  exports: [
    MatButtonModule, 
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatListModule,
    MatToolbarModule, 
    MatSidenavModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ]
  
})

export class MaterialModule { }