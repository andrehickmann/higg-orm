import {AdapterInterface} from "./Adapter/Interface";
import {ConnectionInterface} from "./Connection/Interface";
import {QueryInterface} from "./Query/Interface";
import {ResultInterface} from "./Result/Interface";

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
    query(query: QueryInterface): Promise<ResultInterface> {
        console.log('Adapter.ts: Connect to database...');
        return this.connect()
            .then(connection => {
                return connection.query(query);
            })
            .catch(error => {
                console.log('Error querying Database...');
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
}