import {QueryInterface} from "./QueryInterface";

export class MysqlQuerySelect implements QueryInterface {
    private query: string;
    private columns: object;
    private tableFrom: string;
    private where: object;
    private order: object;
    private limitData: {
        count: 0,
        page: 0
    };

    readonly CONST_SELECT = 'SELECT';
    readonly CONST_FROM = 'FROM';
    readonly CONST_WHERE = 'WHERE';
    readonly CONST_LIMIT = 'LIMIT';

    constructor() {}

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

    from(tableName: string): MysqlQuerySelect {
        this.tableFrom = tableName;
        return this;
    }

    limit(count, page): MysqlQuerySelect {
        this.limitData = {count: count, page: page};
        return this;
    }
}