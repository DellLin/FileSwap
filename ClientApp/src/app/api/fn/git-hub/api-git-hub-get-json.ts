/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ContentViewModel } from '../../models/content-view-model';

export interface ApiGitHubGet$Json$Params {
}

export function apiGitHubGet$Json(http: HttpClient, rootUrl: string, params?: ApiGitHubGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ContentViewModel>>> {
  const rb = new RequestBuilder(rootUrl, apiGitHubGet$Json.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ContentViewModel>>;
    })
  );
}

apiGitHubGet$Json.PATH = '/api/GitHub';
