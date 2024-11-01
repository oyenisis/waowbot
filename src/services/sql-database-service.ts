export abstract class SqlDatabaseService {
  public static instance: SqlDatabaseService;

  public abstract open(): Promise<void>;

  public abstract statement(statement: string): Promise<void>;
  public abstract get(statement: string): Promise<unknown>;
}