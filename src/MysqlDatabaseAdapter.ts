import {DatabaseAdapter} from "./DatabaseAdapter";
import {AdapterInterface} from "./AdapterInterface";
import {ResultInterface} from "./ResultInterface";
import {ConnectionInterface} from "./ConnectionInterface";
import {QueryInterface} from "./QueryInterface";

/**
 * Using decorator-pattern instead of standard inheritance.
 *
 * @see https://dzone.com/articles/is-inheritance-dead
 * @see
 */
export class MysqlDatabaseAdapter implements AdapterInterface {
    private origin: DatabaseAdapter;

    constructor(adapter: DatabaseAdapter) {
        this.origin = adapter;
    }

    query(query: QueryInterface): ResultInterface {
        return this.origin.query(query);
    }

    connect(): ConnectionInterface {
        return this.origin.connect();
    }

    name(): string {
        return this.origin.name();
    }

}