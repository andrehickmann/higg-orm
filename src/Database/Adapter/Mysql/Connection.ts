/**
 * Using mysql library from mysqljs
 * @see https://github.com/mysqljs/mysql
 */
import * as mysql from "mysql";

import {ConnectionInterface} from "../../Connection/Interface";
import {ResultInterface} from "../../Result/Interface";
import {QueryInterface} from "../../Query/Interface";
import {MysqlResult} from "./Result";

/**
 * implementation of an mysql-connection for the database-adapter.
 */
export class MysqlConnection implements ConnectionInterface {

    private resource: mysql;
    private connectionDetails: object;
    private lastQuery: QueryInterface;

    constructor(detail: object) {
        this.connectionDetails = detail;
    }

    open(): Promise<MysqlConnection> {
        return new Promise((resolve, reject) => {
            if (!this.resource) {
                this.resource = mysql.createConnection(this.connectionDetails);
                this.resource.connect(error => {
                    if (error) {
                        reject(error);
                    }
                    resolve(this);
                })
            }
            resolve(this);
        })
    }

    close(): void {
        if (this.resource) {
            this.resource.end();
        }
    }

    query(query: QueryInterface): Promise<ResultInterface> {
        return new Promise((resolve, reject) => {
            return this.open()
                .then(connection => {
                    connection.resource.query(query.assemble(), (error, results, fields) => {
                        if (error) {
                            reject(error);
                        }
                        this.lastQuery = query;
                        resolve(new MysqlResult(results, fields));
                    });
                })
                .catch(error => {
                    console.log('Error querying mysql-database: ');
                });
        })
    }
}