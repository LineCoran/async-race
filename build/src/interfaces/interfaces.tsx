export interface ICar {
    name: string;
    color: string;
}

export interface ICarRES {
    name: string;
    color: string;
}

export interface ICarItem {
    id: number,
    name: string,
    color: string, 
 }
 
 export interface ICarProps {
     car: ICarItem;
     listId: number;
 }

 export interface carPromiseResult {
    time: number;
    id: number;
  }
