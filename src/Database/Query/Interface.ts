import {AdapterInterface} from "../Adapter/Interface";

/**
 * Interface for a standard query or a database.
 *
 */
export interface QueryInterface {
    /**
     * assambling the query and returning the string for querying the database.
     *
     * @return string
     */
    assemble(): string;

    params(): Array<any>;

    /**
     * setting the used adapter for the query.
     *
     * @param databaseAdapter
     * @return QueryInterface
     */
    adapter(databaseAdapter: AdapterInterface): QueryInterface;
}