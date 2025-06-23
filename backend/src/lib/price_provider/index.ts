export interface IPriceProvider {
  getPrice: (pair: string) => Promise<number>;
}

export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}
