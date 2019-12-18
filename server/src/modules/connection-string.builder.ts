export class MongoDBConnectionStringBuilder {
  private uriSchema: string;
  private user: string;
  private password: string;
  private host: string;
  private port: string;
  private databaseName: string;

  constructor() {
    this.uriSchema = 'mongodb://';
  }

  setUser(value: string): MongoDBConnectionStringBuilder {
    this.user = value;
    return this;
  }

  setPassword(value: string): MongoDBConnectionStringBuilder {
    this.password = value;
    return this;
  }

  setHost(value: string): MongoDBConnectionStringBuilder {
    this.host = value;
    return this;
  }

  setPort(value: string): MongoDBConnectionStringBuilder {
    this.port = value;
    return this;
  }

  setDatabaseName(value: string): MongoDBConnectionStringBuilder {
    this.databaseName = value;
    return this;
  }

  build(): string {
    return `${this.uriSchema}${this.user}:${this.password}@${this.host}:${this.port}/${this.databaseName}`;
  }
}
