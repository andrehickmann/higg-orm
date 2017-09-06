import {ConnectionDetailInterface} from "./Detail/Interface";

export class ConnectionDetail implements ConnectionDetailInterface {

    private host: string;
    private user: string;
    private pass: string;
    private databasename: string;
    private portnumber: number;

    constructor(host: string, user: string, pass: string, database?: string, port?: number) {
        this.host = host;
        this.user = user;
        this.pass = pass;
        this.databasename = database;
        this.portnumber = port;
    }

    hostname(): string {
        return this.host;
    }

    username(): string {
        return this.user;
    }

    password(): string {
        return this.pass;
    }

    database(): string {
        if (!this.databasename) {
            throw new Error('No database selected.');
        }
        return this.databasename;
    }

    hasDatabase(): boolean {
        return (!!this.databasename);
    }

    port(): number {
        if (!this.portnumber) {
            throw new Error('No port in connection details found.');
        }
        return this.portnumber;
    }

    hasPort(): boolean {
        return (!!this.portnumber);
    }
}