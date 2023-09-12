/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ContentViewModel } from '../../models/content-view-model';

export interface ApiGitHubPost$Plain$Params {
      body?: {
'file'?: Blob;
}
}

export function apiGitHubPost$Plain(http: HttpClient, rootUrl: string, params?: ApiGitHubPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<ContentViewModel>> {
  const rb = new RequestBuilder(rootUrl, apiGitHubPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ContentViewModel>;
    })
  );
}

apiGitHubPost$Plain.PATH = '/api/GitHub';
