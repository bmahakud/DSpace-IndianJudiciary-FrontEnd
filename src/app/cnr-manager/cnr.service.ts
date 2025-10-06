import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CURRENT_API_URL } from 'src/app/core/serachpage/api-urls';

export interface FileRecord {
  fileName: string;
  hashValue: string;
  createdAt: string;
  ackId?: string;
  cino: string; // Add the cino property
  selected: boolean; // For tracking selection
  posted: boolean; // For tracking post status
  itemUUID: string; // Add the itemUUID property
  status?: 'idle' | 'submitting' | 'submitted' | 'error';
  checkStatusState?: 'idle' | 'checking' | 'checked' | 'error'; 
  userFriendlyPostResponse?: string;
  userFriendlyCheckResponse?: string;
  postResponse?: string; // Add this here
}

export interface SearchResult {
  id: string;
  uuid: string;
  name: string;
  handle: string;
  metadata: any;
}

@Injectable({ providedIn: 'root' })
export class CnrService {
  private baseUrl = `${CURRENT_API_URL}/server/api`;

  constructor(private http: HttpClient) {}

  generate(itemUUID: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/export/zip/${itemUUID}`, {});
  }

  getRecords(): Observable<FileRecord[]> {
    return this.http.get<FileRecord[]>(`${this.baseUrl}/cnr/records`);
  }

  submitCase(cnr: string): Observable<any> {
    const params = new HttpParams()
      .set('cnr', cnr);
    return this.http.post(`${this.baseUrl}/jtdr/submit`, null, { params });
  }

  checkStatus(ackId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/jtdr/status/${ackId}`);
  }

  getSearchResults(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get<any>(`${this.baseUrl}/discover/search/objects`, { params });
  }
}  

