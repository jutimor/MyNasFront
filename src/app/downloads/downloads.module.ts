import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddDownloadComponent } from './components/add-download/add-download.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DownloadsComponent } from './components/downloads/downloads.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DownloadsRoutingModule } from './downloads-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

const COMPONENTS = [AddDownloadComponent, DownloadsComponent];


const MATERIAL = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  FormsModule,
  MatProgressBarModule,
  MatTableModule,
  MatIconModule,
  MatDialogModule,
  MatCheckboxModule];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    HttpClientModule,
    ...MATERIAL,
    DownloadsRoutingModule
  ]
})
export class DownloadsModule { }
