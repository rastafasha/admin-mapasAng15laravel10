import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.modulo';


import { CKEditorModule } from 'ckeditor4-angular';
import { CrimeneLhComponent } from './crimene-lh/crimene-lh.component';
import { DatosVictimasComponent } from './datos-victimas/datos-victimas.component';
import { ViolacionesDdhhComponent } from './violaciones-ddhh/violaciones-ddhh.component';
import {MapaComponent} from './mapa/mapa.component';


//componentes





@NgModule({
    declarations: [
        CrimeneLhComponent,
        DatosVictimasComponent,
        ViolacionesDdhhComponent,
        MapaComponent

    ],
    exports: [
        CKEditorModule,
        CrimeneLhComponent,
        DatosVictimasComponent,
        ViolacionesDdhhComponent,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule,
        MapaComponent


    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule


    ]
})

export class ComponentsModule {}
