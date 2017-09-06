/**
 * Interface for a standard query or a database.
 */
export interface QueryInterface {

    /**
     * assambling the query and returning the string for querying the database.
     *
     * @return string
     */
    assemble(): string;
}