/**
 * Using mysql library from mysqljs
 * @see https://github.com/mysqljs/mysql
 */
import * as mysql from "mysql";
import * as Connection from "mysql/lib/Connection";

import {ConnectionInterface} from "../../Connection/Interface";
import {QueryInterface} from "../../Query/Interface";
import {MysqlResult} from "./Result";
import {AdapterInterface} from "../Interface";
import {MysqlQuerySelect} from "./Query/Select";
import {MysqlConnectionDetail} from "./Connection/Detail";

/**
 * implementation of an mysql-connection for the database-adapter.
 */
export class MysqlConnection implements ConnectionInterface {

    private resource: Connection;
    private connectionDetail: MysqlConnectionDetail;

    /**
     *
     * @param detail
     */
    constructor(detail: MysqlConnectionDetail) {
        this.connectionDetail = detail;
    }

    open(): Promise<MysqlConnection> {
        return new Promise((resolve, reject) => {
            if (!this.resource) {
                this.resource = mysql.createConnection(this.connectionDetail.toObject());
                this.resource.connect(error => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(this);
                    }

                })
            } else {
                resolve(this);
            }
        })
    }

    close(): void {
        if (this.resource) {
            this.resource.end();
        }
    }

    query(query: QueryInterface): Promise<MysqlResult> {
        return new Promise((resolve, reject) => {
            return this.open()
                .then(connection => {
                    connection.resource.query(query.assemble(), (error, results, fields) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(new MysqlResult(results, fields));
                        }
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        })
    }

    select(adapter: AdapterInterface, rows?: Array<string>): MysqlQuerySelect {
        return new MysqlQuerySelect(adapter, rows);
    }

    escape(param: any): string {
        return mysql.escape(param);
    }

    escapeId(id: string): string {
        return mysql.escapeId(id);
    }

    format(query: string, params: Array<any>): string {
        return mysql.format(query, params);
    }

    database(): string {
        return this.connectionDetail.database();
    }
}