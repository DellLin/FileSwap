/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiGitHubDelete } from '../fn/git-hub/api-git-hub-delete';
import { ApiGitHubDelete$Params } from '../fn/git-hub/api-git-hub-delete';
import { apiGitHubFilePathGet } from '../fn/git-hub/api-git-hub-file-path-get';
import { ApiGitHubFilePathGet$Params } from '../fn/git-hub/api-git-hub-file-path-get';
import { apiGitHubGet$Json } from '../fn/git-hub/api-git-hub-get-json';
import { ApiGitHubGet$Json$Params } from '../fn/git-hub/api-git-hub-get-json';
import { apiGitHubGet$Plain } from '../fn/git-hub/api-git-hub-get-plain';
import { ApiGitHubGet$Plain$Params } from '../fn/git-hub/api-git-hub-get-plain';
import { apiGitHubPost$Json } from '../fn/git-hub/api-git-hub-post-json';
import { ApiGitHubPost$Json$Params } from '../fn/git-hub/api-git-hub-post-json';
import { apiGitHubPost$Plain } from '../fn/git-hub/api-git-hub-post-plain';
import { ApiGitHubPost$Plain$Params } from '../fn/git-hub/api-git-hub-post-plain';
import { apiGitHubTestGet } from '../fn/git-hub/api-git-hub-test-get';
import { ApiGitHubTestGet$Params } from '../fn/git-hub/api-git-hub-test-get';
import { ContentViewModel } from '../models/content-view-model';

@Injectable({ providedIn: 'root' })
export class GitHubService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiGitHubTestGet()` */
  static readonly ApiGitHubTestGetPath = '/api/GitHub/Test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGitHubTestGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGitHubTestGet$Response(params?: ApiGitHubTestGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiGitHubTestGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubTestGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGitHubTestGet(params?: ApiGitHubTestGet$Params, context?: HttpContext): Observable<void> {
    return this.apiGitHubTestGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiGitHubGet()` */
  static readonly ApiGitHubGetPath = '/api/GitHub';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGitHubGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGitHubGet$Plain$Response(params?: ApiGitHubGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ContentViewModel>>> {
    return apiGitHubGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGitHubGet$Plain(params?: ApiGitHubGet$Plain$Params, context?: HttpContext): Observable<Array<ContentViewModel>> {
    return this.apiGitHubGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ContentViewModel>>): Array<ContentViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGitHubGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGitHubGet$Json$Response(params?: ApiGitHubGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ContentViewModel>>> {
    return apiGitHubGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGitHubGet$Json(params?: ApiGitHubGet$Json$Params, context?: HttpContext): Observable<Array<ContentViewModel>> {
    return this.apiGitHubGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ContentViewModel>>): Array<ContentViewModel> => r.body)
    );
  }

  /** Path part for operation `apiGitHubPost()` */
  static readonly ApiGitHubPostPath = '/api/GitHub';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGitHubPost$Plain()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiGitHubPost$Plain$Response(params?: ApiGitHubPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<ContentViewModel>> {
    return apiGitHubPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubPost$Plain$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiGitHubPost$Plain(params?: ApiGitHubPost$Plain$Params, context?: HttpContext): Observable<ContentViewModel> {
    return this.apiGitHubPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<ContentViewModel>): ContentViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGitHubPost$Json()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiGitHubPost$Json$Response(params?: ApiGitHubPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<ContentViewModel>> {
    return apiGitHubPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubPost$Json$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiGitHubPost$Json(params?: ApiGitHubPost$Json$Params, context?: HttpContext): Observable<ContentViewModel> {
    return this.apiGitHubPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<ContentViewModel>): ContentViewModel => r.body)
    );
  }

  /** Path part for operation `apiGitHubDelete()` */
  static readonly ApiGitHubDeletePath = '/api/GitHub';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGitHubDelete()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiGitHubDelete$Response(params?: ApiGitHubDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiGitHubDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubDelete$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiGitHubDelete(params?: ApiGitHubDelete$Params, context?: HttpContext): Observable<void> {
    return this.apiGitHubDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiGitHubFilePathGet()` */
  static readonly ApiGitHubFilePathGetPath = '/api/GitHub/{filePath}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGitHubFilePathGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGitHubFilePathGet$Response(params: ApiGitHubFilePathGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiGitHubFilePathGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubFilePathGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGitHubFilePathGet(params: ApiGitHubFilePathGet$Params, context?: HttpContext): Observable<void> {
    return this.apiGitHubFilePathGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
