import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { FileItem, FileLikeObject, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { Action } from 'rxjs/scheduler/Action';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    hasBaseDropZoneOver = false;
    uploadedFileName = null;
    selectedIndex = 0;
    uploader: FileUploader;

    constructor(public snackBar: MdSnackBar) { }

    ngOnInit(): void {

        this.uploader = new FileUploader({
            url: 'http://127.0.0.1:5000/uploads',
            headers: [{name: 'Accept', value: 'application/json'}],
            // https://www.sitepoint.com/web-foundations/mime-types-complete-list/
            allowedMimeType: ['application/zip'],
            // maxFileSize: 1024*1024,
            // autoUpload: true,
        });
        this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
        this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
        this.uploader.onWhenAddingFileFailed = (item, filter, options) => this.onWrongItem(item, filter, options);

    }

    onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
        const data = JSON.parse(response);

        // set the filename
        this.uploadedFileName = data.filename;

        // move to the second tab
        this.selectedIndex = 1;
    }

    onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
        const data = JSON.parse(response);
        this.snackBar.open(data.error, 'Close', {duration: 3000, extraClasses: ['snack-error']});
    }

    onWrongItem(item: FileLikeObject, filter: any, options: any) {
        this.snackBar.open(`File '${item.name}' is not allowed.`, 'Close', {duration: 3000, extraClasses: ['snack-error']});
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
}
