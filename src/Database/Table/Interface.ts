import {AdapterInterface} from "../Adapter/Interface";
import {ResultRow} from "../Result/Row";

export interface TableInterface {
    adapter(): AdapterInterface;
    name(): string;
    columns(): Array<string>;
    prepareDataForModel(data: ResultRow): object;
}