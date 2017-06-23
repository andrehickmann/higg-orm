import {Table} from './Table';
import {RowData} from './RowData';

export abstract class Model {
    private data: Array<RowData>;
    private tableInstance: Table;

    constructor(
        data: Array<RowData>,
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