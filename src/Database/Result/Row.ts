import {ResultRowInterface} from "./Row/Interface";

export class ResultRow implements ResultRowInterface {
    resColumns: Array<string>;
    data: Array<any>;

    constructor(
        columns: Array<string>,
        data: Array<any>
    ){
        this.resColumns = columns;
        this.data = data;
    }

    columns(): Array<string> {
        return this.resColumns;
    }

    values(): Array<any> {
        return this.data;
    }
}