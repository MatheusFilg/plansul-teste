import '@tanstack/react-table';
import { FilterFn } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface FilterFns {
    fuzzy: FilterFn<any>;
  }
}
