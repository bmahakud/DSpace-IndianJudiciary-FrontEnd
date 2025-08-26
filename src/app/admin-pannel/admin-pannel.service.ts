import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CURRENT_API_URL } from '../core/serachpage/api-urls';

const BASE = `${CURRENT_API_URL}/server/api/watermark`;

@Injectable({
  providedIn: 'root'
})
export class WatermarkApiService {
  constructor(private http: HttpClient) {}

  getCurrent(): Observable<Blob> {
    return this.http.get(BASE, { responseType: 'blob', withCredentials: true });
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const form = new FormData();
    form.append('file', file);
    const req = new HttpRequest('POST', BASE, form, {
      reportProgress: true,
      withCredentials: true
    });
    return this.http.request(req);
  }
}
