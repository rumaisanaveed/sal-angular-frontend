export const PRIMARY_INSURANCE_PROVIDERS = [
  { value: '', label: 'Select Insurance' },
  { value: 'MedicareA', label: 'Medicare Part A – Hospital' },
  { value: 'MedicareB', label: 'Medicare Part B – Medical Insurance' },
  { value: 'MedicareC', label: 'Medicare Part C – Medicare Advantage' },
  {
    value: 'MedicareD',
    label: 'Medicare Part D – Additional Coverage OR Secondary Coverage',
  },
  {
    value: 'MedicareA_B',
    label: 'Medicare Part A – Hospital + Medicare Part B – Medical Insurance',
  },
  {
    value: 'MedicareA_C',
    label: 'Medicare Part A – Hospital + Medicare Part C – Medicare Advantage',
  },
  {
    value: 'MedicareA_D',
    label:
      'Medicare Part A – Hospital + Medicare Part D – Additional Coverage OR Secondary Coverage',
  },
  {
    value: 'MedicareB_C',
    label: 'Medicare Part B – Medical Insurance + Medicare Part C – Medicare Advantage',
  },
  {
    value: 'MedicareB_D',
    label:
      'Medicare Part B – Medical Insurance + Medicare Part D – Additional Coverage OR Secondary Coverage',
  },
  {
    value: 'MedicareC_D',
    label:
      'Medicare Part C – Medicare Advantage + Medicare Part D – Additional Coverage OR Secondary Coverage',
  },
  {
    value: 'MedicareA_B_C',
    label:
      'Medicare Part A – Hospital + Medicare Part B – Medical Insurance + Medicare Part C – Medicare Advantage',
  },
  {
    value: 'MedicareA_B_D',
    label:
      'Medicare Part A – Hospital + Medicare Part B – Medical Insurance + Medicare Part D – Additional Coverage OR Secondary Coverage',
  },
  {
    value: 'MedicareA_C_D',
    label:
      'Medicare Part A – Hospital + Medicare Part C – Medicare Advantage + Medicare Part D – Additional Coverage OR Secondary Coverage',
  },
  {
    value: 'MedicareB_C_D',
    label:
      'Medicare Part B – Medical Insurance + Medicare Part C – Medicare Advantage + Medicare Part D – Additional Coverage OR Secondary Coverage',
  },
  {
    value: 'MedicareA_B_C_D',
    label:
      'Medicare Part A – Hospital + Medicare Part B – Medical Insurance + Medicare Part C – Medicare Advantage + Medicare Part D – Additional Coverage OR Secondary Coverage',
  },
  { value: 'BCBS', label: 'Blue Cross Blue Shield' },
  { value: 'UnitedHealthcare', label: 'UnitedHealthcare' },
  { value: 'Elevance', label: 'Elevance Health / Anthem' },
  { value: 'Centene', label: 'Centene Corporation' },
  { value: 'Humana', label: 'Humana Inc.' },
  { value: 'CVS', label: 'CVS Health / Aetna' },
  { value: 'Kaiser', label: 'Kaiser Permanente' },
  { value: 'Cigna', label: 'Cigna Group' },
  { value: 'HCSC', label: 'Health Care Service Corporation (HCSC)' },
  { value: 'Molina', label: 'Molina Healthcare Inc.' },
  { value: 'GuideWell', label: 'GuideWell / Florida Blue' },
  { value: 'Independence', label: 'Independence Health Group' },
  { value: 'Highmark', label: 'Highmark Health' },
  { value: 'UPMC', label: 'UPMC Health Plan' },
  {
    value: 'Point32Health',
    label: 'Point32Health (Harvard Pilgrim + Tufts)',
  },
  { value: 'Priority', label: 'Priority Health' },
  { value: 'MVP', label: 'MVP Health Care' },
  { value: 'CDPHP', label: 'CDPHP' },
  { value: 'Healthfirst', label: 'Healthfirst' },
  { value: 'MetroPlus', label: 'MetroPlusHealth' },
  { value: 'Geisinger', label: 'Geisinger Health Plan' },
  { value: 'Medica', label: 'Medica Inc.' },
  { value: 'Sanford', label: 'Sanford Health Plan' },
  { value: 'Quartz', label: 'Quartz Health Solutions' },
  { value: 'Dean', label: 'Dean Health Plan' },
  { value: 'Oscar', label: 'Oscar Health' },
  { value: 'Bright', label: 'Bright Health' },
  { value: 'Wellpoint', label: 'Wellpoint / Elevance' },
  { value: 'Amerigroup', label: 'Amerigroup Corporation' },
  { value: 'CareSource', label: 'CareSource' },
  { value: 'HealthNet', label: 'Health Net Incorporated' },
  { value: 'Aetna', label: 'Aetna Inc.' },
  { value: 'Beacon', label: 'Beacon Health Options' },
  {
    value: 'MedicaidAdvantage',
    label: 'Medicaid Advantage Specialist Plans',
  },
  {
    value: 'MedicareAdvantage',
    label: 'Medicare Advantage Specialist Plans',
  },
  { value: 'Centivo', label: 'Centivo' },
  { value: 'Alignment', label: 'Alignment Healthcare' },
  { value: 'Aloha', label: 'Aloha Care' },
  { value: 'AmeriHealth', label: 'AmeriHealth Carriers' },
  { value: 'other', label: 'Other' },
];

export const SECONDARY_INSURANCE_PROVIDERS = [
  { value: 'BCBS', label: 'Blue Cross Blue Shield' },
  { value: 'UnitedHealthcare', label: 'UnitedHealthcare' },
  { value: 'Elevance', label: 'Elevance Health / Anthem' },
  { value: 'Centene', label: 'Centene Corporation' },
  { value: 'Humana', label: 'Humana Inc.' },
  { value: 'CVS', label: 'CVS Health / Aetna' },
  { value: 'Kaiser', label: 'Kaiser Permanente' },
  { value: 'Cigna', label: 'Cigna Group' },
  { value: 'HCSC', label: 'Health Care Service Corporation (HCSC)' },
  { value: 'Molina', label: 'Molina Healthcare Inc.' },
  { value: 'GuideWell', label: 'GuideWell / Florida Blue' },
  { value: 'Independence', label: 'Independence Health Group' },
  { value: 'Highmark', label: 'Highmark Health' },
  { value: 'UPMC', label: 'UPMC Health Plan' },
  {
    value: 'Point32Health',
    label: 'Point32Health (Harvard Pilgrim + Tufts)',
  },
  { value: 'Priority', label: 'Priority Health' },
  { value: 'MVP', label: 'MVP Health Care' },
  { value: 'CDPHP', label: 'CDPHP' },
  { value: 'Healthfirst', label: 'Healthfirst' },
  { value: 'MetroPlus', label: 'MetroPlusHealth' },
  { value: 'Geisinger', label: 'Geisinger Health Plan' },
  { value: 'Medica', label: 'Medica Inc.' },
  { value: 'Sanford', label: 'Sanford Health Plan' },
  { value: 'Quartz', label: 'Quartz Health Solutions' },
  { value: 'Dean', label: 'Dean Health Plan' },
  { value: 'Oscar', label: 'Oscar Health' },
  { value: 'Bright', label: 'Bright Health' },
  { value: 'Wellpoint', label: 'Wellpoint / Elevance' },
  { value: 'Amerigroup', label: 'Amerigroup Corporation' },
  { value: 'CareSource', label: 'CareSource' },
  { value: 'HealthNet', label: 'Health Net Incorporated' },
  { value: 'Aetna', label: 'Aetna Inc.' },
  { value: 'Beacon', label: 'Beacon Health Options' },
  {
    value: 'MedicaidAdvantage',
    label: 'Medicaid Advantage Specialist Plans',
  },
  {
    value: 'MedicareAdvantage',
    label: 'Medicare Advantage Specialist Plans',
  },
  { value: 'Centivo', label: 'Centivo' },
  { value: 'Alignment', label: 'Alignment Healthcare' },
  { value: 'Aloha', label: 'Aloha Care' },
  { value: 'AmeriHealth', label: 'AmeriHealth Carriers' },
  { value: 'other', label: 'Other' },
];

export const LIFE_INSURANCE_PROVIDERS = [
  { value: '', label: 'Select Life Insurance Provider' },

  {
    value: 'NorthwesternMutual',
    label: 'Northwestern Mutual Life Insurance Company',
  },
  { value: 'NewYorkLife', label: 'New York Life Insurance Company' },
  {
    value: 'MassMutual',
    label: 'Massachusetts Mutual Life Insurance Company',
  },
  { value: 'MetLife', label: 'Metropolitan Life Insurance Company' },
  { value: 'Prudential', label: 'Prudential Insurance Company of America' },
  {
    value: 'LincolnNational',
    label: 'Lincoln National Life Insurance Company',
  },
  { value: 'ProtectiveLife', label: 'Protective Life Insurance Company' },
  {
    value: 'TIAA',
    label: 'Teachers Insurance and Annuity Association of America (TIAA)',
  },
  { value: 'Nationwide', label: 'Nationwide Life Insurance Company' },
  { value: 'Corebridge', label: 'Corebridge Life Insurance Company' },
  { value: 'Athene', label: 'Athene Annuity and Life Company' },
  {
    value: 'WesternSouthern',
    label: 'The Western and Southern Life Insurance Company',
  },
  { value: 'MutualOfOmaha', label: 'Mutual of Omaha Insurance Company' },
  { value: 'PacificLife', label: 'Pacific Life Insurance Company' },
  {
    value: 'AmericanGeneral',
    label: 'American General Life Insurance Company',
  },
  {
    value: 'JohnHancock',
    label: 'John Hancock Life Insurance Company (U.S.A.)',
  },
  {
    value: 'JacksonNational',
    label: 'Jackson National Life Insurance Company',
  },
  { value: 'Ameritas', label: 'Ameritas Life Insurance Corp.' },
  { value: 'Principal', label: 'Principal Life Insurance Company' },
  { value: 'Unum', label: 'Unum Life Insurance Company of America' },
  {
    value: 'MidlandNational',
    label: 'Midland National Life Insurance Company',
  },
  {
    value: 'NorthAmerican',
    label: 'North American Company for Life and Health Insurance',
  },
  { value: 'Symetra', label: 'Symetra Life Insurance Company' },
  { value: 'BannerLife', label: 'Banner Life Insurance Company' },
  { value: 'PennMutual', label: 'The Penn Mutual Life Insurance Company' },
  {
    value: 'AllianzLife',
    label: 'Allianz Life Insurance Company of North America',
  },
  { value: 'Transamerica', label: 'Transamerica Life Insurance Company' },
  { value: 'MinnesotaLife', label: 'Minnesota Life Insurance Company' },
  {
    value: 'GuardianLife',
    label: 'The Guardian Life Insurance Company of America',
  },
  { value: 'Equitable', label: 'Equitable Financial Life Insurance Company' },
  { value: 'LSW', label: 'Life Insurance Company of the Southwest' },
  { value: 'Equitrust', label: 'Equitrust Life Insurance Company' },
  {
    value: 'AmericanUnited',
    label: 'American United Life Insurance Company',
  },
  { value: 'StandardInsurance', label: 'Standard Insurance Company' },
  {
    value: 'AmericanEquity',
    label: 'American Equity Investment Life Insurance Company',
  },
  { value: 'StateFarm', label: 'State Farm Life Insurance Company' },
  { value: 'USAA', label: 'USAA Life Insurance Company' },
  { value: 'Brighthouse', label: 'Brighthouse Life Insurance Company' },
  { value: 'Genworth', label: 'Genworth Life Insurance Company' },
  {
    value: 'Foresters',
    label: 'Foresters Life Insurance and Annuity Company',
  },
  { value: 'GlobeLife', label: 'Globe Life and Accident Insurance Company' },
  {
    value: 'ColonialLife',
    label: 'Colonial Life & Accident Insurance Company',
  },
  {
    value: 'LibertyNational',
    label: 'Liberty National Life Insurance Company',
  },
  { value: 'NationalLife', label: 'National Life Insurance Company' },
  { value: 'CincinnatiLife', label: 'Cincinnati Life Insurance Company' },
  {
    value: 'FidelityGuaranty',
    label: 'Fidelity & Guaranty Life Insurance Company',
  },
  { value: 'AssurityLife', label: 'Assurity Life Insurance Company' },
  {
    value: 'IllinoisMutual',
    label: 'Illinois Mutual Life Insurance Company',
  },
  { value: 'GerberLife', label: 'Gerber Life Insurance Company' },
  { value: 'TransWorld', label: 'Trans World Assurance Company' },

  { value: 'other', label: 'Other' },
];

export const DISABILITY_INSURANCE_PROVIDERS = [
  { value: '', label: 'Select Disability Insurance Provider' },

  {
    value: 'GuardianLife',
    label: 'Guardian Life Insurance Company of America',
  },
  { value: 'PrincipalLife', label: 'Principal Life Insurance Company' },
  { value: 'MutualOfOmaha', label: 'Mutual of Omaha Insurance Company' },
  { value: 'StandardInsurance', label: 'The Standard Insurance Company' },
  {
    value: 'MassMutual',
    label: 'Massachusetts Mutual Life Insurance Company (MassMutual)',
  },
  {
    value: 'NorthwesternMutual',
    label: 'Northwestern Mutual Life Insurance Company',
  },
  { value: 'UnumLife', label: 'Unum Life Insurance Company of America' },
  {
    value: 'LincolnNational',
    label: 'Lincoln National Life Insurance Company',
  },
  { value: 'NewYorkLife', label: 'New York Life Insurance Company' },
  { value: 'MetLifeUSA', label: 'MetLife Insurance Company USA' },
  {
    value: 'RelianceStandard',
    label: 'Reliance Standard Life Insurance Company',
  },
  { value: 'AssurityLife', label: 'Assurity Life Insurance Company' },
  {
    value: 'IllinoisMutual',
    label: 'Illinois Mutual Life Insurance Company',
  },
  { value: 'Ameritas', label: 'Ameritas Life Insurance Corp.' },
  { value: 'OhioNational', label: 'Ohio National Life Insurance Company' },
  { value: 'SymetraLife', label: 'Symetra Life Insurance Company' },
  { value: 'PacificLife', label: 'Pacific Life Insurance Company' },
  {
    value: 'EquitableLife',
    label: 'Equitable Financial Life Insurance Company',
  },
  {
    value: 'ColonialLife',
    label: 'Colonial Life & Accident Insurance Company',
  },
  { value: 'CignaLife', label: 'Cigna Life Insurance Company of America' },
  { value: 'Aflac', label: 'Aflac Insurance Company' },
  {
    value: 'HartfordLife',
    label: 'Hartford Life and Accident Insurance Company',
  },
  {
    value: 'SunLifeUS',
    label: 'Sun Life Assurance Company of Canada (U.S.)',
  },
  { value: 'NationwideLife', label: 'Nationwide Life Insurance Company' },
  { value: 'SecurianLife', label: 'Securian Life Insurance Company' },
  { value: 'KansasCityLife', label: 'Kansas City Life Insurance Company' },
  { value: 'StateFarmLife', label: 'State Farm Life Insurance Company' },
  { value: 'USAA', label: 'USAA Life Insurance Company' },
  { value: 'Voya', label: 'Voya Retirement Insurance and Annuity Company' },
  { value: 'ProtectiveLife', label: 'Protective Life Insurance Company' },
  { value: 'ManhattanLife', label: 'Manhattan Life Insurance Company' },
  { value: 'NationalLife', label: 'National Life Insurance Company' },
  { value: 'CincinnatiLife', label: 'Cincinnati Life Insurance Company' },
  { value: 'AmericanFidelity', label: 'American Fidelity Assurance Company' },
  { value: 'Trustmark', label: 'Trustmark Insurance Company' },
  {
    value: 'MetLifeConnecticut',
    label: 'MetLife Life and Annuity Company of Connecticut',
  },
  {
    value: 'StandardIndiana',
    label: 'Standard Life Insurance Company of Indiana',
  },
  { value: 'LINA', label: 'Life Insurance Company of North America' },
  {
    value: 'LibertyLifeBoston',
    label: 'Liberty Life Assurance Company of Boston',
  },
  {
    value: 'GreatAmericanLife',
    label: 'Great American Life Insurance Company',
  },

  { value: 'other', label: 'Other' },
];
