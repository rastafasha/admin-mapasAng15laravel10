import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

// Pipes
//import { PipesModule } from '../pipes/pipes.module';





@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        //PipesModule
    ],
    declarations: [
        HeaderComponent,
        MenuComponent,
        FooterComponent,
    ],
    exports: [
        HeaderComponent,
        MenuComponent,
        FooterComponent,
    ]
})

export class SharedModule {}
