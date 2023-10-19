export type Category = { value: string; label: string };

export interface ErrorType {
  error: Error;
  reset: () => void;
}
