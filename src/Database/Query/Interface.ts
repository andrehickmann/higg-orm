import {AdapterInterface} from "../Adapter/Interface";
export interface QueryInterface {
    assemble(): string;
    params(): Array<any>;
    adapter(databaseAdapter: AdapterInterface): QueryInterface;
}