export class RowData {
    columnName: string;
    data: any;

    constructor(
        column: string,
        data: any
    ){
        this.columnName = column;
        this.data = data;
    }

    column(): string {
        return this.columnName;
    }

    value(): any {
        return this.data;
    }
}