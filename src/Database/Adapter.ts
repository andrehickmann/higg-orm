import {AdapterInterface} from "./Adapter/Interface";
import {ConnectionInterface} from "./Connection/Interface";
import {QueryInterface} from "./Query/Interface";
import {ResultInterface} from "./Result/Interface";
import {QuerySelectInterface} from "./Query/Select/Interface";

export class DatabaseAdapter implements AdapterInterface {

    /**
     * holding the number of querys which should be memorized.
     *
     * @type number
     */
    private memorizeQueries: number;

    /**
     * holding the connection to the database (concrete implementation of the adapter).
     * @type ConnectionInterface
     */
    private connection: ConnectionInterface;

    /**
     * holding the name of the adapter.
     *
     * @type string
     */
    private adapterName: string;

    /**
     * holding all made querys.
     *
     * @type {Array}
     */
    private querys: Array<QueryInterface> = [];

    /**
     * standard number of memorized querys.
     *
     * @type {number}
     */
    readonly CONST_NUM_MEM_QUERIES = 10;

    /**
     * @param connDetail ConnectionInterface    data to establish connection to the database
     * @param name string   name of the database adapter
     * @param memorizeQuerys number|null optional: number of querys which will be memorized otherwise 10 querys will be saved
     */
    constructor(connDetail: ConnectionInterface, name: string, memorizeQuerys?: number) {
        this.connection = connDetail;
        this.adapterName = name;
        this.memorizeQueries = memorizeQuerys || this.CONST_NUM_MEM_QUERIES;
    }

    /**
     * querying the database and return the result.
     *
     * @param query QueryInterface
     * @return result ResultInterface
     */
    query(query: QueryInterface): Promise<ResultInterface> {
        return this.connect()
            .then(connection => {
                this.memorizeQuery(query);
                return connection.query(query);
            })
            .catch(error => {
                throw new Error(error);
            })
    }

    /**
     * connection to the database and returning a promise.
     *
     * @return Promise<ConnectionInterface>
     */
    connect(): Promise<ConnectionInterface> {
        return this.connection.open();
    }

    /**
     * returns the name of the adapter.
     *
     * @return {string}
     */
    name(): string  {
        return this.adapterName;
    }

    /**
     * Returning name of database which is used, if any.
     *
     * @return {string}
     */
    database(): string {
        return this.connection.database();
    }

    /**
     * getting the last performed query.
     *
     * @throws Error if no query was found
     * @return {QueryInterface}
     */
    lastQuery(): QueryInterface {
        let queryCount = this.querys.length;
        if (queryCount == 0) {
            throw new Error('There is no last query.');
        }
        return this.querys[(queryCount-1)];
    }

    /**
     * escaping a parameter for the query.
     *
     * @param value any
     * @return {string}
     */
    escape(value: any): string {
        return this.connection.escape(value);
    }

    /**
     * escaping an identifier for the query.
     *
     * @param id string
     * @return {string}
     */
    escapeId(id: string): string {
        return this.connection.escapeId(id);
    }

    format(query: string, params: Array<any>): string {
        return this.connection.format(query, params);
    }

    select(rows: Array<string>): QuerySelectInterface {
        return this.connection.select(this, rows);
    }

    /**
     * adding a query to the memory.
     *
     * @param query QueryInterface
     * @return {DatabaseAdapter}
     */
    private memorizeQuery(query: QueryInterface): DatabaseAdapter {
        if (!this.querys) {
            this.querys = [];
        }
        this.querys.push(query);
        if (this.querys.length > this.memorizeQueries) {
            this.querys.shift();
        }
        return this;
    }
}