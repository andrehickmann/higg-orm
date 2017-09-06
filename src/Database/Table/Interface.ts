import {AdapterInterface} from "../Adapter/Interface";
import {ResultRowInterface} from "../Result/Row/Interface";

export interface TableInterface {
    adapter(): AdapterInterface;
    name(): string;
    columns(): Array<string>;
    prepareDataForModel(data: ResultRowInterface): object;
}