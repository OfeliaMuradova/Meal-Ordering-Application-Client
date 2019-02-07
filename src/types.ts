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
  createdAt?: Date,
  updatedAt?: Date,
  validFrom?: Date,
  validTo?: Date,
  user?: User,
  orderDetails?: Array<OrderDetails>
}

export interface OrderDetails{
  id?: number,
  createdAt?: Date,
  updatedAt?: Date,
  validFrom?: Date,
  validTo?: Date,
  menu?: Menu,
  orderStatus?: OrderStatus,
  confirmer?: User,
  weekDay?: WeekDay
}

export interface OrderStatus{
  id? : number,
  name?: string, 
  englishName?: string, 
}

export interface WeekDay{
  id: number,
  day: string,
  englishName: string
}

export interface Menu{
  id?: number,
  path?: string,
  validFrom?: string,
  validTo?: string,
  company?: Company
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