import {ResultRow} from './Database/Result/Row';
import {ModelInterface} from "./Model/Interface";
import {TableInterface} from "./Database/Table/Interface";

export class Model implements ModelInterface {
    private data: object;
    private tableInstance: TableInterface;

    constructor(
        data: ResultRow,
        table: TableInterface
    ) {
        this.tableInstance = table;
        this.mapData(data);
    }

    /**
     * mapping a given array of data to the model.
     *
     * @param data
     */
    private mapData(data: ResultRow): void {
        this.data = this.table().prepareDataForModel(data);
   }

    /**
     * getting the table of the model.
     * @return {TableInterface}
     */
    table(): TableInterface {
        return this.tableInstance;
    }
}