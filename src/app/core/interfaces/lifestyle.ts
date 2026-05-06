export interface Lifestyle {
  religion?: string;
  worship?: string;
  worshipName?: string;
  worshipAddress?: string;
  maritalStatus?: string;
  workStatus?: string;
  education?: string;
  occupation?: string;
  diet?: string;
  exercise?: string;
}

export enum SectionEnum {
  Lifestyle = 'lifestyle',
  Work = 'work',
  Exercise = 'exercise',
}
