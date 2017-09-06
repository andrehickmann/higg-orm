import {ConnectionDetailInterface} from "../../../Connection/Detail/Interface";

export class MysqlConnectionDetail implements ConnectionDetailInterface {

    private origin: ConnectionDetailInterface;

    constructor(origin: ConnectionDetailInterface) {
        this.origin = origin;
    }

    toObject(): object {
        let connDetail = {
            host: this.origin.hostname(),
            user: this.origin.username(),
            password: this.origin.password(),
            database: '',
            port: 3306
        };
        if (this.origin.hasDatabase()) {
            connDetail.database = this.origin.database();
        }
        if (this.origin.hasPort()) {
            connDetail.port = this.origin.port();
        }
        return connDetail;
    }

    hostname(): string {
        return this.origin.hostname()
    }

    username(): string {
        return this.origin.username();
    }

    password(): string {
        return this.origin.password();
    }

    database(): string {
        return this.origin.database();
    }

    hasDatabase(): boolean {
        return this.origin.hasDatabase();
    }

    port(): number {
        return this.origin.port();
    }

    hasPort(): boolean {
       return this.origin.hasPort();
    }
}