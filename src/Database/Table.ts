import { AdapterInterface } from './Adapter/Interface';
import {TableInterface} from "./Table/Interface";

export class Table implements TableInterface {

    private tableName: string;
    private adapterInstance: AdapterInterface;
    private tableColumns: Array<string>;

    /**
     * @param name name of the table
     */
    constructor(tableName:string, adapter: AdapterInterface) {
        this.tableName = tableName;
        this.adapterInstance = adapter;
    }

    /**
     * getting the name of the table
     *
     * @return {string}
     */
    name(): string {
        return this.tableName;
    }

    /**
     * returning the adapter of the table.
     *
     * @return {AdapterInterface}
     */
    adapter(): AdapterInterface {
        return this.adapterInstance;
    }

    /**
     * returning the columns of the table.
     *
     * @return {Array<string>}
     */
    columns(): Array<string> {

        return this.tableColumns;
    }
}