import { Repository, DeepPartial, EntityTarget, FindOptionsWhere } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { DataSource } from 'typeorm';
import { IsNull } from 'typeorm';

// Define a type that ensures 'id' exists in the entity
interface Identifiable {
  id: string;
}

/**
 * BaseRepository class that extends the default TypeORM Repository class.
 * Provides reusable CRUD operations for all entities.
 */
export class BaseRepository<T extends ObjectLiteral & Identifiable> extends Repository<T> {
  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    super(entity, dataSource.manager);
  }

  async createEntity(data: DeepPartial<T>): Promise<Partial<T>> {
      const entity = this.create(data);
      const savedEntity = await this.save(entity);
      return this.removeSensitiveFields(savedEntity);
  }

  async updateEntity(id: string, data: DeepPartial<T>): Promise<Partial<T>> {
      const entity = await this.findOneBy({ id } as FindOptionsWhere<T>); 
      Object.assign(entity, data);
      const updatedEntity = await this.save(entity);
      return this.removeSensitiveFields(updatedEntity);
  }

  async findOneEntity(conditions: any): Promise<Partial<T>|null> {
    const record = await this.findOne({ where: { ...conditions, deleted: IsNull() } } );
    if(!record) return null;
      return this.removeSensitiveFields(record);
  }

  async findEntities(conditions: any = {}): Promise<Partial<T>[]> {
    const entities = await this.find({
      where: {
        ...conditions,
        deleted: IsNull(), 
      } as FindOptionsWhere<T>, 
    });
    return entities.map(entity => this.removeSensitiveFields(entity));
  }

  async deleteEntity(id: string): Promise<any> {
    return this.update(id, { deleted: new Date() } as any);
  }

  private removeSensitiveFields(entity: T): Partial<T> {
    const { deleted, ...cleanedEntity } = entity as any;
    return cleanedEntity;
  }
}
