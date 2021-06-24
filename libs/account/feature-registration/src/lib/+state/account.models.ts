import { Week } from './../../../../../shared-util/src/lib/types/weekdays-type';
/**
 * Interface for the 'Account' data
 */
export interface AccountEntity {
  id: string | null; // Primary ID
  parentId: string | null;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  companyName: string;
  description: string;
  services:string[];
  schedule: Week;
}
