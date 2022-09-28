export interface NewRecrutationDto {
  externalId: string;
  companyName: string;
  companyDescription?: string;
  position: string;
  recruitersName?: string;
  websiteUrl?: string;
  workType: string;
  workLanguage: string;
  recrutationLanguage: string;
  meetingDateAndHour: Date
  isSalaryRanged: boolean;
  salary?: number;
  minSalary?: number;
  maxSalary?: number;
  employmentType: string;
  comments?: string;
}
