export interface Usecase<P, R> {
  execute(param: P): R;
}

