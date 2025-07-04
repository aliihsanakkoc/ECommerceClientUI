export interface ExceptionViewModel {
  type: string;
  title: string;
  status: number;
  detail: string;
  Errors: ErrorDetail[];
}

export interface ErrorDetail {
  property: string;
  Errors: string[];
}