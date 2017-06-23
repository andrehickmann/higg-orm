import {ConnectionInterface} from "./ConnectionInterface";
import * as mysql from "mysql";

export class MysqlConnection implements ConnectionInterface {

    private resource: mysql;
    private connectionDetails: object;

    constructor(detail: object) {
        this.connectionDetails = detail;
    }

    open(): mysql {
        if (!this.resource) {
            this.resource = mysql.createConnection(this.connectionDetails);
            this.resource.connect(function(error){
                if (error) {
                    throw new Error(error.stack);
                }
                console.log('mysql-connection established');
            });
        }
        return this.resource;
    }

    close(): void {
        if (this.resource) {
            this.resource.end();
        }
    }
}