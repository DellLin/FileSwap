/* tslint:disable */
/* eslint-disable */
import { ContentTypeStringEnum } from './content-type-string-enum';
export interface ContentViewModel {
  child?: null | Array<ContentViewModel>;
  contentType?: ContentTypeStringEnum;
  name?: null | string;
  path?: null | string;
  sha?: null | string;
}
