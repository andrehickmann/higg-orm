import {QuerySelectInterface} from "../../../Query/Select/Interface";
import {AdapterInterface} from "../../Interface";

export class MysqlQuerySelect implements QuerySelectInterface {
    private query: string;
    private tableFrom: string;
    private orderData: Array<any> = [];
    private whereData: Array<any> = [];
    private limitData: {
        count: number,
        page: number
    };

    private databaseAdapter: AdapterInterface;

    readonly CONST_SELECT = 'SELECT';
    readonly CONST_FROM = 'FROM';
    readonly CONST_WHERE = 'WHERE';
    readonly CONST_ORDER = 'ORDER BY';
    readonly CONST_LIMIT = 'LIMIT';

    readonly CONST_OR = 'OR';
    readonly CONST_AND = 'AND';
    readonly CONST_ORDER_DESC = 'DESC';
    readonly CONST_ORDER_ASC = 'ASC';

    constructor() {}

    /**
     * Generating a mysql-select-query out of the current select-object.
     *
     * @return {string}
     */
    assemble(): string {
        this.query = this.CONST_SELECT
                   + ' * ' // has to be replaced with selected rows...
                   + this.CONST_FROM
                   + ' ??';

        // adding WHERE part
        for (let i = 0; i < this.whereData.length; i++) {
            if (i=== 0) {
                this.query += ' ' + this.CONST_WHERE + ' ';
            }
            if (i > 1) {
                this.query += this.whereData[i].type + ' ';
            }
            this.query += this.whereData[i].where;
        }

        // adding ORDER BY part
        for (let iOrder = 0; iOrder < this.orderData.length; iOrder++) {
            if (iOrder === 0) {
                this.query += ' ' + this.CONST_ORDER
            } else {
                this.query += ',';
            }
            this.query += ' ' + this.orderData[iOrder].by;
            if (this.orderData[iOrder].direction) {
                this.query += ' ' + this.orderData[iOrder].direction;
            }
        }

        // adding LIMIT part
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
     * @param params
     * @param type
     * @return {MysqlQuerySelect}
     */
    where(where: string, params: Array<any>, type?: string): MysqlQuerySelect {
        if (type && (type !== this.CONST_AND && type !== this.CONST_OR)) {
            throw new Error('Please pass correct where-type');
        }
        if (!type) {
            type = this.CONST_AND;
        }
        this.whereData.push({where: where, params: params, type: type});
        return this;
    }

    order(by: string, direction: string): MysqlQuerySelect {
        if (!by) {
            throw new Error('No column to order by given.');
        }
        if (direction && (direction !== this.CONST_ORDER_ASC && direction !== this.CONST_ORDER_DESC)) {
            throw new Error('"' + direction + '" is no valid order direction.');
        }
        this.orderData.push({by: by, direction: direction});
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

    adapter(databaseAdapter: AdapterInterface): MysqlQuerySelect {
        this.databaseAdapter = databaseAdapter;
        return this;
    }

    params(): Array<any> {
       let params = [];
       params.push(this.tableFrom);
       for (let i = 0; i < this.whereData.length; i++) {
           params.push(this.whereData[i].params);
       }
       return params;
    }
}