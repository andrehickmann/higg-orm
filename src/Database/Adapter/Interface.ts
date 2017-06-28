import { QueryInterface } from '../Query/Interface';
import { ResultInterface } from "../Result/Interface";
import { ConnectionInterface } from "../Connection/Interface";

export interface AdapterInterface {
    connect(): Promise<ConnectionInterface>
    query(query:QueryInterface): Promise<ResultInterface>;
    name(): string;
}