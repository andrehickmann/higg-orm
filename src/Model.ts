import {Table} from './Database/Table';
import {ResultRow} from './Database/Result/Row';
import {ModelInterface} from "./Model/Interface";

export class Model implements ModelInterface{
    private data: ResultRow;
    private tableInstance: Table;

    constructor(
        data: ResultRow,
        table: Table
    ) {
        this.tableInstance = table;
        this.mapData(data);
    }

    /**
     * mapping a given array of data to the model.
     *
     * @param data
     */
    private mapData(data: object): void {
//        let data = this.table().prepareDataForModel(data),
//            modelName = this.table().getName();
//        _.extend(this, data[modelName]);
   }

    /**
     * getting the table of the model.
     * @return {Table}
     */
    table(): Table {
        return this.tableInstance;
    }
}