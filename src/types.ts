export interface Meal{
  qty: number;
  code: string;
  type: string;
  description: string;
  singlePrice: number;
}

export interface User{
  id?: number,
  name: string,
  username: string,
  password?: string,
  position: string,
  email: string,
  phone_number: string,
  userRole?: UserRole
}

export interface Order{
  id?: number,
  orderText: string,
  menu: Menu
  confirmer: User,
  weekDay: WeekDay
}

export interface WeekDay{
  id: number,
  day: string,
  englishName: string
}

export interface Menu{
  path: string,
  validFrom: string,
  validTo: string,
  company: Company
}

export interface Company{
  id?: number,
  name?: string,
  webPageUrl?: string  
  menus?: Array<Menu>
}

export interface UserRole{
  id: number,
  name: string
}

export enum Workdays{
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday
}