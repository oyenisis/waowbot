export abstract class SqlDatabaseService {
  public static instance: SqlDatabaseService;

  public abstract open(): Promise<void>;
  public abstract close(): Promise<void>;

  public abstract statement(statement: string, ...params: unknown[]): Promise<void>;
  public abstract get(statement: string, ...params: unknown[]): Promise<unknown>;
}