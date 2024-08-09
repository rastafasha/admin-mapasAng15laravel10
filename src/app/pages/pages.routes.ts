import { RouterModule, Routes } from '@angular/router';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaisComponent } from './forms/pais/pais.component';
import { PaisesComponent } from './manage/paises/paises.component';
import { PrensaEditComponent } from './prensa/prensa-edit/prensa-edit.component';
import { PrensaIndexComponent } from './prensa/prensa-index/prensa-index.component';
import { SliderEditComponent } from './slider/slider-edit/slider-edit.component';
import { SliderIndexComponent } from './slider/slider-index/slider-index.component';
// import { VideoIndexComponent } from './videos/video-index/video-index.component';
// import { VideoEditComponent } from './videos/video-edit/video-edit.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        
        children: [
            {
                path: 'admin',
                component: DashboardComponent,
                
                data: { titulo: 'Dashboard', }
            },
            { path: 'paises', component: PaisesComponent},
            { path: 'pais/create', component: PaisComponent},
            { path: 'pais/edit/:id', component: PaisComponent},

            { path: 'prensa', component: PrensaIndexComponent},
            { path: 'prensa/create', component: PrensaEditComponent},
            { path: 'prensa/edit/:id', component: PrensaEditComponent},

            { path: 'slider', component: SliderIndexComponent},
            { path: 'slider/create', component: SliderEditComponent},
            { path: 'slider/edit/:id', component: SliderEditComponent},

            // { path: 'video', component: VideoIndexComponent},
            // { path: 'video/create', component: VideoEditComponent},
            // { path: 'video/edit/:id', component: VideoEditComponent},

            { path: '', redirectTo: '/admin', pathMatch: 'full'},
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
