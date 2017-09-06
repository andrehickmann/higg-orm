import {ModelInterface} from "./Model/Interface";
import {TableInterface} from "./Database/Table/Interface";
import {ResultRowInterface} from "./Database/Result/Row/Interface";

/**
 *
 */
export class Model implements ModelInterface {
    private data: object;
    private tableInstance: TableInterface;

    /**
     *
     * @param data ResultRow, the result from the select-query.
     * @param table TableInterface
     */
    constructor(
        data: ResultRowInterface,
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
    private mapData(data: ResultRowInterface): void {
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