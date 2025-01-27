import { stringify } from 'qs';
import { generatePath } from '../utils/generatePath';
import { isAbsolutePath } from '../utils/isAbsolutePath';

export class NextRoute {
  public path: string;
  public page?: string;
  public params?: object;
  public queryStringParams?: object;
  public query?: object;
  public isAbsolutePath: boolean;

  constructor(
    path: string,
    page?: string,
    params?: object,
    queryStringParams?: object,
    query?: object
  ) {
    this.path = path;
    this.page = page;
    this.params = params;
    this.queryStringParams = queryStringParams;
    this.query = query;
    this.isAbsolutePath = isAbsolutePath(path);
  }

  public toAs(): string {
    if (this.isAbsolutePath) {
      return this.path;
    }

    const path = generatePath(this.path, this.params);
    const queryString = stringify(this.queryStringParams, { indices: false });

    return queryString ? `${path}?${queryString}` : path;
  }

  public toHref(): string {
    if (this.isAbsolutePath) {
      return this.path;
    }

    const queryString = stringify(
      {
        ...this.query,
        ...this.params,
        ...this.queryStringParams,
      },
      { indices: false }
    );

    return queryString ? `${this.page}?${queryString}` : this.page;
  }
}
