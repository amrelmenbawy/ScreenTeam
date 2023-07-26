import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
 import {BreadcrumbModule} from 'xng-breadcrumb'
import { NgxSpinnerModule } from 'ngx-spinner';
import { Toast } from 'bootstrap';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NavbarComponent,
    TestErrorComponent,
    ServerErrorComponent,
    NotFoundComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    RouterModule,
    BreadcrumbModule,
    NgxSpinnerModule,
    SharedModule
  ],
  exports:[NavbarComponent,
  
  SectionHeaderComponent
,NgxSpinnerModule
]
})
export class CoreModule { }
