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
  phone: string,
  role: string
}

export interface Menu{
  path: string,
  //webPageUrl: string  
}

export interface Company{
  name: string,
  webPageUrl: string  
  menus: Array<Menu>
}

export enum Workdays{
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday
}

export let userList: Array<User> = [
    { name: 'Mark Mark',
      username: 'ertert',
      password: 'string',
      position: 'string',
      email: 'string',
      phone: 'string',
      role: 'string'},

      { name: 'Guga Makharashvili',
      username: 'ertert',
      password: 'string',
      position: 'string',
      email: 'string',
      phone: 'string',
      role: 'string'},

    { name: 'Mark Mark',
      username: 'ertert',
      password: 'string',
      position: 'string',
      email: 'string',
      phone: 'string',
      role: 'string'},

      { name: 'Guga Makharashvili',
      username: 'ertert',
      password: 'string',
      position: 'string',
      email: 'string',
      phone: 'string',
      role: 'string'},

    { name: 'Mark Mark',
      username: 'ertert',
      password: 'string',
      position: 'string',
      email: 'string',
      phone: 'string',
      role: 'string'},

      { name: 'Guga Makharashvili',
      username: 'ertert',
      password: 'string',
      position: 'string',
      email: 'string',
      phone: 'string',
      role: 'string'},  
      
    { name: 'Mark Mark',
      username: 'ertert',
      password: 'string',
      position: 'string',
      email: 'string',
      phone: 'string',
      role: 'string'},

      { name: 'Guga Makharashvili',
      username: 'ertert',
      password: 'string',
      position: 'string',
      email: 'string',
      phone: 'string',
      role: 'string'},  
]


 export let companiesList: Array<Company> = [
//   { name: 'Merkel Menu',
//     url: 'string'
//   },
//   { name: 'Merkel Menu',
//     url: 'string'
//   },
//   { name: 'Merkel Menu',
//     url: 'string'
//   },
//   { name: 'Merkel Menu',
//     url: 'string'
//   },
//   { name: 'Merkel Menu',
//     url: 'string'
//   },
//   { name: 'Merkel Menu',
//     url: 'string'
//   },
//   { name: 'Merkel Menu',
//     url: 'string'
//   },
//   { name: 'Merkel Menu',
//     url: 'string'
//   }
 ]