import {QuerySelectInterface} from "../../../Query/Select/Interface";
import {AdapterInterface} from "../../Interface";

export class MysqlQuerySelect implements QuerySelectInterface {
    private query: string;
    private rows: Array<any>;
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

    constructor(adapter: AdapterInterface, rows?: Array<string>) {
        this.databaseAdapter = adapter;
        this.rows = rows;
    }

    /**
     * Generating a mysql-select-query out of the current select-object.
     *
     * @return {string}
     */
    assemble(): string {
        let params = [];

        this.query = `${this.CONST_SELECT} `;
        if (!this.rows) {
            this.query += '* ';
        } else {
            for ( let iRow = 0; iRow < this.rows.length; iRow++) {
                this.query += '??';
                if (iRow < this.rows.length - 1) {
                    this.query += ', ';
                }
                params.push(this.rows[iRow]);
            }
        }
        this.query += ` ${this.CONST_FROM} ?? `;
        params.push(this.tableFrom);

        // adding WHERE part
        for (let iWhere = 0; iWhere < this.whereData.length; iWhere++) {
            if (iWhere=== 0) {
                this.query += `${this.CONST_WHERE} `;
            }
            if (iWhere > 1) {
                this.query += `${this.whereData[iWhere].type} `;
            }
            if (this.whereData[iWhere].where) {
                this.query += this.whereData[iWhere].where;
                params = params.concat(this.whereData[iWhere].params);
            }
        }

        // adding ORDER BY part
        for (let iOrder = 0; iOrder < this.orderData.length; iOrder++) {
            if (iOrder === 0) {
                this.query += ` ${this.CONST_ORDER}`;
            } else {
                this.query += ',';
            }
            this.query += ' ??';
            params.push(this.orderData[iOrder].by);
            if (this.orderData[iOrder].direction) {
                this.query += ` ${this.orderData[iOrder].direction}`;
            }
        }

        // adding LIMIT part
        if (this.limitData.count > 0) {
            this.query += ` ${this.CONST_LIMIT} ${this.limitData.count}`;
        }

        return this.databaseAdapter.format(this.query, params);
    }

    /**
     * Selecting which table you want query. returning the MysqlQuerySelect object
     * for a fluent interface.
     *
     * @param table string
     * @return {MysqlQuerySelect}
     */
    from(table: string): MysqlQuerySelect {
        this.tableFrom = table;
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
        type = type || this.CONST_AND;
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
        offset = offset || 0;
        this.limitData = {count: count, page: offset};
        return this;
    }

    params(): Array<any> {
       let params = [];
       params.push(this.tableFrom);
       for (let i in this.whereData) {
           params.push(this.whereData[i].params);
       }
       return params;
    }
}