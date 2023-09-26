/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';

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
  apiGitHubTestGet$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, GitHubService.ApiGitHubTestGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: '*/*', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubTestGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGitHubTestGet(
    params?: {
    },
    context?: HttpContext
  ): Observable<void> {
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
  apiGitHubGet$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<ContentViewModel>>> {
    const rb = new RequestBuilder(this.rootUrl, GitHubService.ApiGitHubGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ContentViewModel>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGitHubGet$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<ContentViewModel>> {
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
  apiGitHubGet$Json$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<ContentViewModel>>> {
    const rb = new RequestBuilder(this.rootUrl, GitHubService.ApiGitHubGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ContentViewModel>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGitHubGet$Json(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<ContentViewModel>> {
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
  apiGitHubPost$Plain$Response(
    params?: {
      body?: {
'files'?: Array<Blob>;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<ContentViewModel>>> {
    const rb = new RequestBuilder(this.rootUrl, GitHubService.ApiGitHubPostPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ContentViewModel>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubPost$Plain$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiGitHubPost$Plain(
    params?: {
      body?: {
'files'?: Array<Blob>;
}
    },
    context?: HttpContext
  ): Observable<Array<ContentViewModel>> {
    return this.apiGitHubPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ContentViewModel>>): Array<ContentViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGitHubPost$Json()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiGitHubPost$Json$Response(
    params?: {
      body?: {
'files'?: Array<Blob>;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<ContentViewModel>>> {
    const rb = new RequestBuilder(this.rootUrl, GitHubService.ApiGitHubPostPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ContentViewModel>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubPost$Json$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiGitHubPost$Json(
    params?: {
      body?: {
'files'?: Array<Blob>;
}
    },
    context?: HttpContext
  ): Observable<Array<ContentViewModel>> {
    return this.apiGitHubPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ContentViewModel>>): Array<ContentViewModel> => r.body)
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
  apiGitHubDelete$Response(
    params?: {
      body?: ContentViewModel
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, GitHubService.ApiGitHubDeletePath, 'delete');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: '*/*', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubDelete$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiGitHubDelete(
    params?: {
      body?: ContentViewModel
    },
    context?: HttpContext
  ): Observable<void> {
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
  apiGitHubFilePathGet$Response(
    params: {
      filePath: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, GitHubService.ApiGitHubFilePathGetPath, 'get');
    if (params) {
      rb.path('filePath', params.filePath, {"style":"simple"});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: '*/*', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGitHubFilePathGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGitHubFilePathGet(
    params: {
      filePath: string;
    },
    context?: HttpContext
  ): Observable<void> {
    return this.apiGitHubFilePathGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
