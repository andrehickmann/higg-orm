import {ResultInterface} from "../Result/Interface";
import {QueryInterface} from "../Query/Interface";

export interface ConnectionInterface {
    open(): Promise<ConnectionInterface>;
    query(query: QueryInterface): Promise<ResultInterface>;
    close(): void;
}