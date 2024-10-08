// base.entity.ts
import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
  Column,
  DeleteDateColumn,
} from 'typeorm';

export abstract class BaseEntity  {
  
  @UpdateDateColumn({
    type: 'timestamp',
    
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
})
  updatedAt: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
})
createdAt: string;

@DeleteDateColumn({
  type: 'timestamp',
})
deletedAt: string;
 }

export abstract class BaseEntityWithId extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
export abstract class BaseEntityWithMeta extends BaseEntityWithId {
  @Column({ type: 'varchar', length: 100, nullable: true })
  createdBy: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  updatedBy: string;
}

