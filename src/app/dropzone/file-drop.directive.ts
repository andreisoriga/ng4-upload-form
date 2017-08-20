import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
    selector: '[appFileDrop]'
})
export class FileDropDirective {

    @Output() filesDropped = new EventEmitter<FileList>();
    @Output() filesHovered = new EventEmitter();

    constructor() { }

    @HostListener('drop', ['$event'])
        onDrop($event) {
            $event.preventDefault();

            const transfer = $event.dataTransfer;
            this.filesDropped.emit(transfer.files);
            this.filesHovered.emit(false);

        }

    @HostListener('dragover', ['$event'])
        onDragOver($event) {
            $event.preventDefault();
            this.filesHovered.emit(true);
        }

    @HostListener('dragleave', ['$event'])
        onDragLeave($event) {
            this.filesHovered.emit(false);
        }

}
