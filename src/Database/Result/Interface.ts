import {ResultRow} from "./Row";
export interface ResultInterface extends Iterator<ResultRow> {
    fetchRow() : ResultRow;
    fetchRows(): Array<ResultRow>;
    count(): number;
}