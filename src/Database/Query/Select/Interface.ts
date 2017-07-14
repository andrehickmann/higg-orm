import {QueryInterface} from "../Interface";

export interface QuerySelectInterface extends QueryInterface {
    from(table: string): QuerySelectInterface;
    limit(size: number, page?: number): QuerySelectInterface;
    where(where: string, params: Array<any>, type?:string): QuerySelectInterface;
    order(by: string, direction: string): QuerySelectInterface;
}