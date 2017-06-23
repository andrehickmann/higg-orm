import { QueryInterface } from './QueryInterface';
import { ResultInterface } from "./ResultInterface";
import {ConnectionInterface} from "./ConnectionInterface";

export interface AdapterInterface {
    connect(): ConnectionInterface
    query(query:QueryInterface): ResultInterface;
    name(): string;
}