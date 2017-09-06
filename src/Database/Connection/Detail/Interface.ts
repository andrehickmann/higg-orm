export interface ConnectionDetailInterface {
    hostname(): string;
    username(): string;
    password(): string;
    database(): string;
    hasDatabase(): boolean;
    port(): number;
    hasPort(): boolean;
}