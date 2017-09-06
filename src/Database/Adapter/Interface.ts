import { QueryInterface } from '../Query/Interface';
import { ResultInterface } from "../Result/Interface";
import { ConnectionInterface } from "../Connection/Interface";
import {QuerySelectInterface} from "../Query/Select/Interface";

export interface AdapterInterface {
    /**
     * connecting the database-adapter.
     *
     * @return Promise<ConnectionInterface>
     */
    connect(): Promise<ConnectionInterface>

    /**
     * execute an query on the adapter and returning a promise.
     *
     * @param query QueryInterface
     * @return Promise<ResultInterface>
     */
    query(query:QueryInterface): Promise<ResultInterface>;

    /**
     * getting the last performed query of the database.
     *
     * @return QueryInterface
     */
    lastQuery(): QueryInterface;

    /**
     * getting the name of the adapter.
     *
     * @return string
     */
    name(): string;

    /**
     * escaping a value for the query.
     *
     * @param param any
     * @return string
     */
    escape(param: any) : string;

    /**
     * escaping a identifier for the query.
     *
     * @param id string
     * @return string
     */
    escapeId(id: string): string;

    /**
     * escaping all identifiers and params in a query-string.
     *
     * @param query query string with identifiers replaced with ?? and params replaced with ?
     * @param params all identifiers and params in order in which they appear in the query
     * @return string
     */
    format(query: string, params: Array<any>): string;

    /**
     * returning an select object of the database-connection.
     *
     * @return QuerySelectInterface
     */
    select(rows?: Array<string>): QuerySelectInterface;

    /**
     * returning the name of the database which the adapter is connected to.
     *
     * @return string
     */
    database(): string;
}