import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CURRENT_API_URL } from '../core/serachpage/api-urls';

@Injectable({
  providedIn: 'root'
})
export class AdminAuditService {
  private  = '/api/audit';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
      return this.http.get<any[]>(`${CURRENT_API_URL}/server/api/audit/users`);
  }

  getAuditLogsByUser(userId: string): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<any[]>(`${CURRENT_API_URL}/server/api/audit/user`, { params });
  }
}
