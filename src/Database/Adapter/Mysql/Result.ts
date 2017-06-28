
import {ResultInterface} from "../../Result/Interface";
import {ResultRow} from "../../Result/Row";

export class MysqlResult implements ResultInterface {
    private data;
    private fields;

    constructor(data, fields) {
        this.data = data;
        this.fields = fields;
    }

    fetchRow(): any {
        return null;
    }

    fetchRows(): any {
        return this.data;
    }
}