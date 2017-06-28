import {AdapterInterface} from "../Adapter/Interface";

export interface TableInterface {
    adapter(): AdapterInterface;
    name(): string;
    columns(): Array<string>;
}