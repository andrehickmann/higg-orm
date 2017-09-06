import {ResultInterface} from "../Result/Interface";
import {QueryInterface} from "../Query/Interface";
import {QuerySelectInterface} from "../Query/Select/Interface";
import {AdapterInterface} from "../Adapter/Interface";

/**
 * Interface for implementing your own connection to a database.
 */
export interface ConnectionInterface {
    open(): Promise<ConnectionInterface>;
    query(query: QueryInterface): Promise<ResultInterface>;
    close(): void;
    escape(param: any): string;
    escapeId(id: string): string;
    format(query: string, params: Array<any>): string;
    select(adapter: AdapterInterface, rows?: Array<string>): QuerySelectInterface;
    database(): string;
}