export interface QueryInterface {
    assemble(): string;
    from(table: string): QueryInterface;
    limit(size: number, page?: number): QueryInterface
}