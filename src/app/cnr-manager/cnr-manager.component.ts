// import { Component, OnInit } from '@angular/core';
// import { CnrService, FileRecord } from './cnr.service';

// @Component({
//   selector: 'app-cnr-manager',
//   templateUrl: './cnr-manager.component.html',
//   styleUrls: ['./cnr-manager.component.scss']
// })
// export class CnrManagerComponent implements OnInit {
//   searchQuery: string = '';
//   loading: boolean = false;
//   generating: boolean = false;
//   submitting: boolean = false;
//   searchResults: FileRecord[] = [];
//   selectedSearchFiles: FileRecord[] = []; // Selected files from the Search Results table
//   selectedGeneratedFiles: FileRecord[] = []; // Selected files from the Generated Files table
//   generatedFiles: FileRecord[] = [];

//   constructor(private cnrService: CnrService) {}

//   ngOnInit(): void {
//     this.loadGeneratedFiles(); // Load previously generated files
//   }

//   loadGeneratedFiles() {
//     this.cnrService.getRecords().subscribe({
//       next: (response) => {
//         const postErrorMap: { [code: string]: string } = {
//           '401': 'CNR must not be null or empty.',
//           '402': 'Zip hash must not be null or empty.',
//           '403': 'Invalid Zip File.',
//           '404': 'Zip name mismatch.',
//           '405': 'ZIP hash mismatch.',
//           '406': 'Invalid userId.',
//           '407': 'UserId not found in JTDR.',
//           '409': 'Duplicate case detected. Case already exists for provided CNR.',
//           '500': 'Internal Server Error.'
//         };
  
//         const checkErrorMap: { [code: string]: string } = {
//           '401': 'CNR must not be null or empty.',
//           '402': 'Zip hash must not be null or empty.',
//           '403': 'Invalid Zip File.',
//           '405': 'ZIP hash mismatch.',
//           '409': 'Duplicate case detected. Case already exists for provided CNR.',
//           '500': 'Internal Server Error.'
//         };
  
//         this.generatedFiles = (response as any[]).map((file) => {
//           const postResp = file.postResponse || '';
//           const checkResp = file.getCheckResponse || '';
  
//           const postStatusCode = postResp.match(/^(\d{3})/)?.[1];
//           const checkStatusCode = checkResp.match(/^(\d{3})/)?.[1];
  
//           let userFriendlyPostResponse = '';
//           if (postResp.includes('Folder to zip not found')) {
//             userFriendlyPostResponse = 'Folder to zip not found.';
//           } else if (postStatusCode && postErrorMap[postStatusCode]) {
//             userFriendlyPostResponse = postErrorMap[postStatusCode];
//           } else {
//             userFriendlyPostResponse = postResp || 'Not submitted yet';
//           }
  
//           const userFriendlyCheckResponse =
//             checkStatusCode && checkErrorMap[checkStatusCode]
//               ? checkErrorMap[checkStatusCode]
//               : checkResp || 'Not verified yet';
  
//           return {
//             ...file,
//             selected: false,               // For checkbox selection
//             status: 'idle',                 // For submit progress bar
//             checkStatusState: 'idle',       // For check status progress bar
//             userFriendlyPostResponse,
//             userFriendlyCheckResponse
//           };
//         });
//       },
//       error: (error) => {
//         console.error('Error fetching generated files:', error);
//       }
//     });
//   }
  

//   searchItems() {
//     if (this.searchQuery.trim() === '') {
//       this.searchResults = [];
//       return;
//     }

//     this.loading = true;

//     this.cnrService.getSearchResults(this.searchQuery).subscribe({
//       next: (response) => {
//         const objects = response._embedded?.searchResult?._embedded?.objects || [];
//         this.searchResults = objects.map((obj: any) => {
//           const metadata = obj._embedded?.indexableObject?.metadata || {};
//           return {
//             cino: metadata['dc.cino']?.[0]?.value || 'N/A',
//             fileName: obj._embedded?.indexableObject?.name || 'N/A',
//             hashValue: 'N/A',
//             createdAt: obj._embedded?.indexableObject?.lastModified || 'N/A',
//             selected: false,
//             ackId: obj._embedded?.indexableObject?.ackId || null,
//             itemUUID: obj._embedded?.indexableObject?.uuid || null,  // Store UUID for generating files
//           };
//         });
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Search error:', error);
//         this.searchResults = [];
//         this.loading = false;
//       }
//     });
//   }

//   onSearchInput() {
//     if (this.searchQuery.trim() === '') {
//       this.searchResults = [];
//     }
//   }

//   onSearchSelectionChange() {
//     this.selectedSearchFiles = this.searchResults.filter(file => file.selected);
//   }

//   onGeneratedSelectionChange() {
//     this.selectedGeneratedFiles = this.generatedFiles.filter(file => file.selected);
//   }

//   generateFiles() {
//     if (this.selectedSearchFiles.length === 0) return;

//     this.generating = true;

//     this.selectedSearchFiles.forEach(item => {
//       console.log(`Generating files for UUID: ${item.itemUUID}`);
//       this.cnrService.generate(item.itemUUID).subscribe({
//         next: () => {
//           console.log(`Zip file generated for Item UUID: ${item.itemUUID}`);
//         },
//         error: (error) => {
//           console.error(`Error generating zip for Item UUID: ${item.itemUUID}`, error);
//         }
//       });
//     });

//     this.generating = false;
//   }

//   checkStatus(file: FileRecord) {
//     if (file.ackId) {
//     file.checkStatusState = 'checking';

//       this.cnrService.checkStatus(file.ackId).subscribe({
//         next: (response) => {
//           console.log(`Status checked for AckId: ${file.ackId}`, response);
//           file.checkStatusState = 'checked';
//           file.userFriendlyCheckResponse = response?.message || 'Checked successfully';
//         },
//         error: (error) => {
//           console.error('Error checking status:', error);
//           file.checkStatusState = 'error';
//           file.userFriendlyCheckResponse = 'Status check failed';
//         }
//       });
//     }
//   }

//   submitFile(file: FileRecord) {
//     if (file.fileName) {
//       file.status = 'submitting';
//       this.cnrService.submitCase(file.fileName).subscribe({
//         next: (response) => {
//           console.log(`Case submitted for CINO: ${file.fileName}`, response);
//           file.status = 'submitted'; // Change to submitted state
//           file.ackId = response?.ackId || file.ackId; // If backend returns ackId
//           file.userFriendlyPostResponse = 'Submitted successfully';
//         },
//         error: (error) => {
//           console.error('Error submitting case:', error);
//           file.status = 'error'; // Indicate failure
//           file.userFriendlyPostResponse = 'Submission failed';
//         }
//       });
//     }
//   }

//   submitAllFiles() {
//     if (this.selectedGeneratedFiles.length === 0) return;

//     this.submitting = true;

//     this.selectedGeneratedFiles.forEach((item, index) => {
//       this.cnrService.submitCase(item.fileName).subscribe({
//         next: (response) => {
//           console.log(`Case submitted for CINO: ${item.fileName}`, response);
//           if (index === this.selectedGeneratedFiles.length - 1) {
//             this.submitting = false;  // Finish submitting once the last file is processed
//           }
//         },
//         error: (error) => {
//           console.error('Error submitting case for CINO: ', item.fileName, error);
//           if (index === this.selectedGeneratedFiles.length - 1) {
//             this.submitting = false;  // Finish submitting if any error occurs
//           }
//         }
//       });
//     });
//   }

//   addToCart() {
//     const selected = this.searchResults.filter(file => file.selected);
//     this.selectedSearchFiles.push(...selected);
//       this.selectedSearchFiles = Array.from(new Set(this.selectedSearchFiles.map(f => f.fileName)))
//     .map(fileName => this.selectedSearchFiles.find(f => f.fileName === fileName)!);
//     console.log('Items added to the cart:', this.selectedSearchFiles);
//   }
  
// }



import { Component, OnInit } from '@angular/core';
import { finalize, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CnrService, FileRecord } from './cnr.service';

type SubmitState = 'idle' | 'submitting' | 'submitted' | 'error';
type CheckState = 'idle' | 'checking' | 'checked' | 'error';

@Component({
  selector: 'app-cnr-manager',
  templateUrl: './cnr-manager.component.html',
  styleUrls: ['./cnr-manager.component.scss']
})
export class CnrManagerComponent implements OnInit {
  searchQuery = '';
  loading = false;
  generating = false;
  submitting = false;

  searchResults: FileRecord[] = [];
  selectedSearchFiles: FileRecord[] = [];
  selectedGeneratedFiles: FileRecord[] = [];
  generatedFiles: Array<FileRecord & {
    selected: boolean;
    status: SubmitState;
    checkStatusState: CheckState;
    userFriendlyPostResponse: string;
    userFriendlyCheckResponse: string;
    postResponse?: string;
  }> = [];

  // --- Friendly maps ---
  private readonly POST_CODE_MAP: Record<string, string> = {
    '200': 'Submitted successfully.',
    '201': 'Case created.',
    '202': 'Submission accepted for processing.',
    '401': 'CNR must not be null or empty.',
    '402': 'Zip hash must not be null or empty.',
    '403': 'Invalid Zip File.',
    '404': 'Zip name mismatch.',
    '405': 'ZIP hash mismatch.',
    '406': 'Invalid userId.',
    '407': 'UserId not found in JTDR.',
    '409': 'Duplicate case detected. Case already exists for provided CNR.',
    '500': 'Internal Server Error.'
  };

  private readonly CHECK_CODE_MAP: Record<string, string> = {
    '200': 'Checked successfully.',
    '202': 'Check accepted for processing.',
    '401': 'CNR must not be null or empty.',
    '402': 'Zip hash must not be null or empty.',
    '403': 'Invalid Zip File.',
    '405': 'ZIP hash mismatch.',
    '409': 'Duplicate case detected. Case already exists for provided CNR.',
    '500': 'Internal Server Error.'
  };

  constructor(private cnrService: CnrService) {}

  ngOnInit(): void {
    this.loadGeneratedFiles();
  }

  // ---------- Utils ----------
  private asString(v: any): string {
    if (typeof v === 'string') return v;
    try { return JSON.stringify(v); } catch { return String(v); }
  }

  private parsePostResult(input: any): { code?: string; message?: string; ackId?: string; raw: string } {
    const httpStatus = input?.status ? String(input.status) : undefined;

    // Plain object
    if (input && typeof input === 'object' && !('error' in input)) {
      const code = input.statusCode ? String(input.statusCode) : httpStatus;
      return { code, message: input.message, ackId: input.ackId, raw: this.asString(input) };
    }

    // HttpErrorResponse with JSON
    if (input?.error && typeof input.error === 'object') {
      const code = input.error.statusCode ? String(input.error.statusCode) : httpStatus;
      return { code, message: input.error.message ?? input.message, ackId: input.error.ackId, raw: this.asString(input.error) };
    }

    // Text body
    const text: string =
      typeof input?.error === 'string'
        ? input.error
        : (typeof input === 'string' ? input : input?.message ?? '');

    const codeFromText =
      text.match(/"statusCode"\s*:\s*"?(\d{3})"?/i)?.[1] ||
      text.match(/\b(\d{3})\b/)?.[1] ||
      httpStatus;

    const msgFromText = text.match(/"message"\s*:\s*"([^"]+)"/i)?.[1];

    return { code: codeFromText, message: msgFromText, raw: text || this.asString(input) };
  }

  private mapFriendly(map: Record<string, string>, code?: string, message?: string, raw?: string, fallback = 'Unknown response'): string {
    return (code && map[code]) || message || raw || fallback;
  }

  // ---------- Load Generated Files ----------
  loadGeneratedFiles() {
    this.cnrService.getRecords().subscribe({
      next: (response) => {
        const postErrorMap = this.POST_CODE_MAP;
        const checkErrorMap = this.CHECK_CODE_MAP;

        this.generatedFiles = (response as any[]).map((file) => {
          const postResp: string = file.postResponse || '';
          const checkResp: string = file.getCheckResponse || '';

          const postStatusCode = postResp.match(/^(\d{3})/)?.[1];
          const checkStatusCode = checkResp.match(/^(\d{3})/)?.[1];

          let userFriendlyPostResponse = '';
          if (postResp.includes('Folder to zip not found')) {
            userFriendlyPostResponse = 'Folder to zip not found.';
          } else if (postStatusCode && postErrorMap[postStatusCode]) {
            userFriendlyPostResponse = postErrorMap[postStatusCode];
          } else {
            userFriendlyPostResponse = postResp || 'Not submitted yet';
          }

          const userFriendlyCheckResponse =
            (checkStatusCode && checkErrorMap[checkStatusCode]) || checkResp || 'Not verified yet';

          return {
            ...file,
            selected: false,
            status: 'idle',
            checkStatusState: 'idle',
            userFriendlyPostResponse,
            userFriendlyCheckResponse
          };
        });
      },
      error: (err) => {
        console.error('Error fetching generated files:', err);
      }
    });
  }

  // ---------- Search ----------
  searchItems() {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.loading = true;

    this.cnrService.getSearchResults(this.searchQuery)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          const objects = response._embedded?.searchResult?._embedded?.objects || [];
          this.searchResults = objects.map((obj: any) => {
            const metadata = obj._embedded?.indexableObject?.metadata || {};
            return {
              cino: metadata['dc.cino']?.[0]?.value || 'N/A',
              fileName: obj._embedded?.indexableObject?.name || 'N/A',
              hashValue: 'N/A',
              createdAt: obj._embedded?.indexableObject?.lastModified || 'N/A',
              selected: false,
              ackId: obj._embedded?.indexableObject?.ackId || null,
              itemUUID: obj._embedded?.indexableObject?.uuid || null
            } as FileRecord;
          });
        },
        error: (err) => {
          console.error('Search error:', err);
          this.searchResults = [];
        }
      });
  }

  onSearchInput() {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
    }
  }

  onSearchSelectionChange() {
    this.selectedSearchFiles = this.searchResults.filter(file => (file as any).selected);
  }

  onGeneratedSelectionChange() {
    this.selectedGeneratedFiles = this.generatedFiles.filter(file => file.selected);
  }

  // ---------- Generate ----------
  generateFiles() {
    if (this.selectedSearchFiles.length === 0) return;

    this.generating = true;

    const calls = this.selectedSearchFiles.map(item =>
      this.cnrService.generate(item.itemUUID).pipe(
        catchError(err => {
          console.error(`Error generating zip for Item UUID: ${item.itemUUID}`, err);
          return of(null);
        })
      )
    );

    forkJoin(calls).pipe(finalize(() => (this.generating = false))).subscribe();
  }

  // ---------- Submit Single ----------
  submitFile(file: FileRecord & { status?: SubmitState; userFriendlyPostResponse?: string; postResponse?: string; ackId?: string }) {
    if (!file.fileName) return;

    file.status = 'submitting';
    file.userFriendlyPostResponse = '';

    this.cnrService.submitCase(file.fileName).subscribe({
      next: (response) => {
        const { code, message, ackId, raw } = this.parsePostResult(response);
        if (ackId) file.ackId = ackId;

        const isSuccess = code ? code.startsWith('2') : true;
        file.status = isSuccess ? 'submitted' : 'error';

        file.userFriendlyPostResponse = this.mapFriendly(this.POST_CODE_MAP, code, message, raw, 'Unknown response');
        file.postResponse = raw;
      },
      error: (err) => {
        const { code, message, raw } = this.parsePostResult(err);
        file.status = 'error';
        file.userFriendlyPostResponse = this.mapFriendly(this.POST_CODE_MAP, code, message, raw, 'Submission failed');
        file.postResponse = raw;
      }
    });
  }

  // ---------- Submit Multiple ----------
  submitAllFiles() {
    if (this.selectedGeneratedFiles.length === 0) return;

    this.submitting = true;

    const calls = this.selectedGeneratedFiles.map((item) => {
      item.status = 'submitting';
      item.userFriendlyPostResponse = '';

      return this.cnrService.submitCase(item.fileName).pipe(
        catchError((err) => {
          const { code, message, raw } = this.parsePostResult(err);
          item.status = 'error';
          item.userFriendlyPostResponse = this.mapFriendly(this.POST_CODE_MAP, code, message, raw, 'Submission failed');
          item.postResponse = raw;
          return of(null);
        })
      );
    });

    forkJoin(calls)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe((responses) => {
        responses?.forEach((resp, idx) => {
          if (!resp) return;
          const item = this.selectedGeneratedFiles[idx];
          const { code, message, ackId, raw } = this.parsePostResult(resp);
          if (ackId) item.ackId = ackId;
          const isSuccess = code ? code.startsWith('2') : true;
          item.status = isSuccess ? 'submitted' : 'error';
          item.userFriendlyPostResponse = this.mapFriendly(this.POST_CODE_MAP, code, message, raw, 'Unknown response');
          item.postResponse = raw;
        });
      });
  }

  // ---------- Check Status ----------
  checkStatus(file: FileRecord & { checkStatusState?: CheckState; userFriendlyCheckResponse?: string; ackId?: string }) {
    if (!file.ackId) return;

    file.checkStatusState = 'checking';

    this.cnrService.checkStatus(file.ackId).subscribe({
      next: (response) => {
        const { code, message, raw } = this.parsePostResult(response);
        file.checkStatusState = 'checked';
        file.userFriendlyCheckResponse = this.mapFriendly(this.CHECK_CODE_MAP, code, message, raw, 'Checked successfully');
      },
      error: (err) => {
        const { code, message, raw } = this.parsePostResult(err);
        file.checkStatusState = 'error';
        file.userFriendlyCheckResponse = this.mapFriendly(this.CHECK_CODE_MAP, code, message, raw, 'Status check failed');
      }
    });
  }

  // ---------- Cart ----------
  addToCart() {
    const selected = this.searchResults.filter((f: any) => f.selected);
    this.selectedSearchFiles.push(...selected);

    // de-dupe by fileName
    const dedup = new Map<string, FileRecord>();
    this.selectedSearchFiles.forEach(f => { if (f.fileName) dedup.set(f.fileName, f); });
    this.selectedSearchFiles = Array.from(dedup.values());
  }
}
