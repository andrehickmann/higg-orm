import {TableInterface} from "../Database/Table/Interface";

export interface ModelInterface {

    /**
     * returning the table of the model
     * @return TableInterface
     */
    table(): TableInterface
}