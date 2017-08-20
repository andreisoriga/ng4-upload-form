import { Component, ViewChild } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { UploadService } from './upload.service';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { DropzoneComponent } from './dropzone/dropzone.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    @ViewChild('uploadForm') uploadForm: NgForm;
    @ViewChild(DropzoneComponent) dropzone: DropzoneComponent;

    constructor(public snackBar: MdSnackBar,
                private uploadService: UploadService) { }

    onUploadFormSubmit() {

        const dropzone_data = this.dropzone.getFiles();

        this.uploadService.uploadFile(dropzone_data).subscribe(
            event => {
                if (event.type === HttpEventType.UploadProgress) {
                    // This is an upload progress event. Compute and show the % done:
                    const percentDone = Math.round(100 * event.loaded / event.total);
                    console.log(`File is ${percentDone}% uploaded.`);
                } else if (event instanceof HttpResponse) {

                    // having the filename is time to send the rest of the form data
                    this.uploadService.sendFormData({
                        'filenames': event.body['filenames'],
                        'comment': this.uploadForm.value.comment
                    }).subscribe(
                        response => {
                            // clear upload form
                            this.uploadForm.reset();
                            this.dropzone.clearDropzone();

                            console.log(response)
                        },
                        error => console.log(error)
                    );

                }
            },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log('An error occurred:', err.error.message);
                    this.snackBar.open('Client error ' + err.error.message,
                        'Close', { duration: 3000, extraClasses: ['snack-error'] });
                } else {
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                    console.log(err.error);
                    this.snackBar.open('Server has returned error ' + err.status,
                        'Close', { duration: 3000, extraClasses: ['snack-error'] });
                }
            }
        )

    }

    clearUploadForm() {
        // reset dropzone
        this.dropzone.clearDropzone();
    }
}
