/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ContentViewModel } from '../../models/content-view-model';

export interface ApiGitHubGet$Plain$Params {
}

export function apiGitHubGet$Plain(http: HttpClient, rootUrl: string, params?: ApiGitHubGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ContentViewModel>>> {
  const rb = new RequestBuilder(rootUrl, apiGitHubGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ContentViewModel>>;
    })
  );
}

apiGitHubGet$Plain.PATH = '/api/GitHub';
