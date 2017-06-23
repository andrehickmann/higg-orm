import {AdapterInterface} from "./AdapterInterface";

export interface TableInterface {
    adapter(): AdapterInterface;
    name(): string;
    columns(): Array<string>;
}