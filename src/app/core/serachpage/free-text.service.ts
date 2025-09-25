import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CURRENT_API_URL } from './api-urls';

@Injectable({
  providedIn: 'root'
})
export class FreeTextService {
  private baseUrl = `${CURRENT_API_URL}/server/api/discover/search/objects`;

  constructor(private http: HttpClient) {}

  getDateSearchResults(
    query: string = '*',
    startDate?: string,
    endDate?: string,
    sortBy: string = 'dc.title',
    sortOrder: string = 'ASC',
    resultsPerPage: number = 10
  ): Observable<any> {
    let params = new HttpParams()
      .set('query', query || '*')
      .set('sort', `${sortBy},${sortOrder}`)
      .set('size', resultsPerPage.toString());

    if (startDate) {
      params = params.append('f', `dc.date.issued,gt:${startDate}`);
    }
    if (endDate) {
      params = params.append('f', `dc.date.issued,lt:${endDate}`);
    }

    return this.http.get<any>(this.baseUrl, { params });
  }
}
