import { Component, Output, EventEmitter, HostListener, Input } from '@angular/core';

@Component({
    selector: 'app-dropzone',
    templateUrl: './dropzone.component.html',
    styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent {

    @Input() allowedMimeType = []

    dropzoneData = new FormData();

    dropzoneActive = false;
    dropzoneError = null;
    dropzoneSuccess = false;

    fileNames = [];

    constructor() { }

    getFiles(): FormData {
        return this.dropzoneData;
    }

    isValid(): boolean {
        return this.dropzoneSuccess;
    }

    _dropzoneState($event: boolean) {
        this.dropzoneActive = $event;
    }

    _handleDrop(fileList: FileList) {

        // get a range... javascript way... what a blin??
        const filesIndex = Array.from(Array(fileList.length).keys());
        const filesNotAllowed = [];

        // reset dropzone
        this.clearDropzone();

        filesIndex.forEach((idx) => {
            console.log(fileList[idx]);

            if (this.allowedMimeType.includes(fileList[idx].type)) {
                this.fileNames.push(fileList[idx].name);
                this.dropzoneData.append('file', fileList[idx], fileList[idx].name);
            } else {
                this.dropzoneError = `The extension of file "${fileList[idx].name}" is not allowed.`;
                filesNotAllowed.push(fileList[idx]);
            }
        });

        if (filesNotAllowed.length === 0) {
            this.dropzoneSuccess = true;
        }
    }

    clearDropzone() {
        // reset dropzone
        this.dropzoneData = new FormData();
        this.dropzoneError = null;
        this.dropzoneSuccess = false;
        this.fileNames = [];
    }

}
