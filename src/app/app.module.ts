import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import 'hammerjs';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdIconModule, MdSnackBarModule, MdInputModule } from '@angular/material';
import { UploadService } from './upload.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { FileDropDirective } from './dropzone/file-drop.directive';

@NgModule({
    declarations: [
        AppComponent,
        FileDropDirective,
        DropzoneComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MdButtonModule,
        MdInputModule,
        MdIconModule,
        MdSnackBarModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [UploadService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
