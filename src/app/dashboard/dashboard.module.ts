import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgbTypeahead,
    NgbModule
  ]
})
export class DashboardModule { }
