import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UploadService {
    private url = 'http://localhost:5000';

    constructor(private http: HttpClient) { }

    uploadFile(data: FormData) {
        const req = new HttpRequest('POST', this.url + '/uploads', data, { reportProgress: true });
        return this.http.request(req);
    }

    sendFormData(data) {
        return this.http.post(this.url + '/form-data', data)
    }

}
