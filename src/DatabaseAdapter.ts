import {AdapterInterface} from "./AdapterInterface";
import {ConnectionInterface} from "./ConnectionInterface";
import {QueryInterface} from "./QueryInterface";
import {ResultInterface} from "./ResultInterface";

export class DatabaseAdapter implements AdapterInterface {
    private connection: ConnectionInterface;
    private adapterName: string;

    /**
     * @param connDetail ConnectionInterface    data to establish connection to the database
     * @param name string   name of the database adapter
     */
    constructor(connDetail: ConnectionInterface, name: string) {
        this.connection = connDetail;
        this.adapterName = name;
    }

    /**
     * querying the database and return the result.
     *
     * @param query QueryInterface
     * @return result ResultInterface
     */
    query(query: QueryInterface): ResultInterface {
        let connection = this.connection.open();
        return connection.query(query);
    }

    connect(): ConnectionInterface {
        this.connection.open();
        return this.connection;
    }

    /**
     * returns the name of the adapter.
     *
     * @return {string}
     */
    name(): string  {
        return this.adapterName;
    }
}