import {QueryInterface} from "../../../Query/Interface";

export class MysqlQuerySelect implements QueryInterface {
    private query: string;
    private columns: object;
    private tableFrom: string;
    private where: object;
    private order: object;
    private limitData: {
        count: number,
        page: number
    };

    readonly CONST_SELECT = 'SELECT';
    readonly CONST_FROM = 'FROM';
    readonly CONST_WHERE = 'WHERE';
    readonly CONST_LIMIT = 'LIMIT';

    constructor() {}

    /**
     * Generating a mysql-select-query out of the current select-object.
     *
     * @return {string}
     */
    assemble(): string {
        this.query = this.CONST_SELECT
                   + ' * '
                   + this.CONST_FROM
                   + ' '
                   + this.tableFrom;
        if (this.limitData.count > 0) {
            this.query += ' ' + this.CONST_LIMIT + ' ' + this.limitData.count;
        }
        return this.query;
    }

    /**
     * Selecting which table you want query. returning the MysqlQuerySelect object
     * for a fluent interface.
     *
     * @param tableName string
     * @return {MysqlQuerySelect}
     */
    from(tableName: string): MysqlQuerySelect {
        this.tableFrom = tableName;
        return this;
    }

    /**
     * Limiting the result by count and an given offset. If no offset is given, assuming zero offset.
     *
     * @param count
     * @param offset
     * @return {MysqlQuerySelect}
     */
    limit(count: number, offset?: number): MysqlQuerySelect {
        if (!offset) {
            offset = 0;
        }
        this.limitData = {count: count, page: offset};
        return this;
    }
}