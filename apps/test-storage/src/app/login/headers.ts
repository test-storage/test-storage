import { HttpHeaders } from '@angular/common/http';

export let contentHeaders = new HttpHeaders();
contentHeaders = contentHeaders.set('Accept', 'application/json');
contentHeaders = contentHeaders.set('Content-Type', 'application/json');
