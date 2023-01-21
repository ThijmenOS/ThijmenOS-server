export enum HttpStatus {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export interface responseShape<T> {
  data: T;
  status: HttpStatus;
}

export class Response<T> implements responseShape<T> {
  data: T;
  status: HttpStatus;

  constructor(props: responseShape<T>) {
    this.data = props.data;
    this.status = props.status;
  }
}
