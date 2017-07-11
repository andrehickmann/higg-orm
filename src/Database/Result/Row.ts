import {ResultRowInterface} from "./Row/Interface";

/**
 * Implementing a result from an select-query.
 */
export class ResultRow implements ResultRowInterface {

    origin: object;
    valuesOfRow: Array<any>;

    constructor(
        data: object
    ){
        this.origin = data;
    }

    /**
     * returning all columns of the result-row
     *
     * @return {string[]}
     */
    columns(): Array<string> {
        return Object.keys(this.origin);
    }

    /**
     * returning all values of the result-row
     * @return {Array<any>}
     */
    values(): Array<any> {
        if (!this.valuesOfRow) {
            this.valuesOfRow = [];
            for (const key of this.columns()) {
                this.valuesOfRow.push(this.origin[key]);
            }
        }
        return this.valuesOfRow;
    }

    data(): any {
        return this.origin;
    }
}