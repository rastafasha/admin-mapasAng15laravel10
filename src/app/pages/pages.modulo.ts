import { NgModule } from '@angular/core';


import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.modulo';

import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';


// pipe
import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';
// import {KeysPipe} from '../pipes/keys.pipe';
import { OrderModule } from 'ngx-order-pipe';

// Import Angular plugin.
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { CKEditorModule } from 'ckeditor4-angular';

// paginacion
import { NgxPaginationModule } from 'ngx-pagination';

//paginas
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaisComponent } from './forms/pais/pais.component';
import { PaisesComponent } from './manage/paises/paises.component';

import { ComponentsModule } from '../components/componets.modulo';

import{PrensaIndexComponent} from './prensa/prensa-index/prensa-index.component';
import{PrensaEditComponent} from './prensa/prensa-edit/prensa-edit.component';
import{SliderIndexComponent} from './slider/slider-index/slider-index.component';
import{SliderEditComponent} from './slider/slider-edit/slider-edit.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
// import { VideoIndexComponent } from './videos/video-index/video-index.component';
// import { VideoEditComponent } from './videos/video-edit/video-edit.component';



@NgModule({
    declarations: [
        PagesComponent,
        EscapeHtmlPipe,
        // KeysPipe,
        DashboardComponent,
        PaisComponent,
        PaisesComponent,
        PrensaIndexComponent,
        PrensaEditComponent,
        SliderIndexComponent,
        SliderEditComponent,
        UsersComponent,
        UserDetailsComponent

    ],
    exports: [
        PagesComponent,
        EscapeHtmlPipe,
        // KeysPipe,
        NgxPaginationModule,
        CKEditorModule,
        DashboardComponent,
        PaisComponent,
        PaisesComponent,
        PrensaIndexComponent,
        PrensaEditComponent,
        SliderIndexComponent,
        SliderEditComponent,
        UsersComponent,
        UserDetailsComponent
        // VideoIndexComponent,
        // VideoEditComponent


    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        OrderModule,
        NgxPaginationModule,
        CKEditorModule,
        ComponentsModule

    ]
})

export class PagesModule {}
