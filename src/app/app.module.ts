import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import 'hammerjs';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdIconModule, MdTabsModule, MdSnackBarModule} from '@angular/material';
import {FileDropDirective, FileSelectDirective} from 'ng2-file-upload';

@NgModule({
    declarations: [
        AppComponent,
        FileDropDirective,
        FileSelectDirective
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MdButtonModule,
        MdCheckboxModule,
        MdTabsModule,
        MdIconModule,
        MdSnackBarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
