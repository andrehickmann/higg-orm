import {ResultInterface} from "../../Result/Interface";
import {ResultRow} from "../../Result/Row";

export class MysqlResult implements ResultInterface {
    private data: Array<ResultRow>;
    private fields: Array<any>;
    private pointer: number;

    constructor(data: Array<any>, fields: Array<any>) {
        this.data = this.mapData(data);
        this.fields = fields;
        this.pointer = 0;
    }

    /**
     * returning one row from the result.
     * if no row is left, error will be thrown.
     *
     * @return {ResultRow}
     * @throws Error
     */
    fetchRow(): ResultRow {
        let row = this.next();
        if (row.done === false) {
            return row.value;
        } else {
            throw new Error('There is no more row in the result.');
        }
    }

    /**
     * implementing iterator interface.
     *
     * @return {{done: boolean, value: ResultRow}}
     */
    next(): IteratorResult<ResultRow> {
        if (this.pointer < this.count()) {
            return {
                done: false,
                value: this.data[this.pointer++],
            }
        } else {
            return {
                done: true,
                value: null
            }
        }
    }

    /**
     * fetching all rows of the result.
     *
     * @return Array<ResultRow>
     */
    fetchRows(): Array<ResultRow> {
        return this.data;
    }

    /**
     *
     * @return {number}
     */
    count() : number {
        return this.data.length;
    }

    /**
     *
     * @param data
     * @return {any[]}
     */
    private mapData(data: any): Array<ResultRow> {
        if (!data) {
            throw new Error('No data to map.');
        }
        let mappedData = new Array();
        for (const entry of data) {
            mappedData.push(new ResultRow(entry));
        }
        return mappedData;
    }
}