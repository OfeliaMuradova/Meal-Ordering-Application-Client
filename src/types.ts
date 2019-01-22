export interface Meal{
  qty: number;
  code: string;
  type: string;
  description: string;
  singlePrice: number;
}

export interface User{
  name: string,
  username: string,
  password?: string,
  position: string,
  email: string,
  phone_number: string,
  userRole: UserRole
}

export interface Order{
  order_text: string,
  menu: Menu
  confirmer: User
  //updated_at: Date
  //confirmed_at: Date
}

export interface Menu{
  path: string,
  weekNum: number,
  company: Company
}

export interface Company{
  name: string,
  webPageUrl: string  
  menus: Array<Menu>
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