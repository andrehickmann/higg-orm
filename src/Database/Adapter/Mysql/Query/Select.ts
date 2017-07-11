import {QueryInterface} from "../../../Query/Interface";

export class MysqlQuerySelect implements QueryInterface {
    private query: string;
    private columns: Array<string>;
    private tableFrom: string;
    private whereData: Array<any> = new Array();
    private order: object;
    private limitData: {
        count: number,
        page: number
    };

    readonly CONST_SELECT = 'SELECT';
    readonly CONST_FROM = 'FROM';
    readonly CONST_WHERE = 'WHERE';
    readonly CONST_LIMIT = 'LIMIT';

    readonly CONST_OR = 'OR';
    readonly CONST_AND = 'AND';

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
        for (let i = 0; i < this.whereData.length; i++) {
            this.query += ' ' + this.CONST_WHERE + ' ';
            if (i > 1) {
                this.query += this.whereData[i].type + ' ';
            }

            this.query += this.whereData[i].where;
        }
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
     * Adding where clause as a string. You can pass a type
     * which defines how the where-clause is added (AND, OR).
     *
     * @param where
     * @param type
     * @return {MysqlQuerySelect}
     */
    where(where: string, type?: string): MysqlQuerySelect {
        if (type && (type !== this.CONST_AND && type !== this.CONST_OR)) {
            throw new Error('Please pass correct where-type');
        }
        if (!type) {
            type = this.CONST_AND;
        }
        this.whereData.push({where: where, type: type});
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