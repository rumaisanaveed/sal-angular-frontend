export type InputMode = 'search' | 'manual';

export enum InputModeEnum {
  Search = 'search',
  Manual = 'manual',
}

export const INPUT_MODES: { label: string; value: InputModeEnum }[] = [
  { label: 'Search', value: InputModeEnum.Search },
  { label: 'Manual', value: InputModeEnum.Manual },
];
