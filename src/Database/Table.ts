import { AdapterInterface } from './Adapter/Interface';
import { TableInterface } from "./Table/Interface";
import { ResultRow } from "./Result/Row";

export class Table implements TableInterface {

    private tableName: string;
    private adapterInstance: AdapterInterface;
    private tableColumns: Array<string>;

    /**
     * @param tableName string
     * @param adapter AdapterInterface
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
        if (!this.tableColumns) {
            this.tableColumns = [];
        }
        return this.tableColumns;
    }

    /**
     * preparing the data for the model.
     * parsing the data out of the result and map it to the model.
     *
     * @param data
     * @return {{}}
     */
    prepareDataForModel(data: ResultRow): object {
        return data.data();
    }
}