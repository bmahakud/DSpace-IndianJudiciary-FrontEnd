import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminAuditService } from './admin-audit.service';

interface UserActionLog {
  action: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  objectId: string | null;
}

@Component({
  selector: 'app-audit-user-details',
  templateUrl: './audit-user-details.component.html',
  styleUrls: ['./audit-user-details.component.scss']
})
export class AuditUserDetailsComponent implements OnInit {
  userId: string = '';
  userLogs: UserActionLog[] = [];
  uniqueDevices: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private auditService: AdminAuditService
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('userId');
    if (paramId) {
      this.userId = paramId;
      this.fetchUserLogs(this.userId);
    } else {
      console.error('User ID param is missing');
    }
  }

  fetchUserLogs(userId: string): void {
    this.auditService.getAuditLogsByUser(userId).subscribe({
      next: (logs: UserActionLog[]) => {
        this.userLogs = logs;
        this.uniqueDevices = [...new Set(logs.map(log => log.userAgent))];
      },
      error: (err) => {
        console.error('Error fetching audit logs:', err);
      }
    });
  }
}
