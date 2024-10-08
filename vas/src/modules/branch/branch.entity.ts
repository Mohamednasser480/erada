import { IBranch } from '../../types';
import { Column, Entity, OneToMany, JoinColumn, DeleteDateColumn } from 'typeorm';
import { BaseEntityWithId, BaseEntityWithMeta } from '../../abstract';

@Entity()
export class Branch extends BaseEntityWithId {
  @Column({ type: 'varchar', length: 100})
  name: string;
  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'varchar', length: 100,})
  managerId: string;

  @Column({ type: 'varchar',length: 100 })
  area: string;

  @Column({ type: 'varchar',length: 100 })
  gaverment: string;

  @Column({ type: 'varchar',length: 100 , default: null })
  lat: string;
  @Column({ type: 'varchar',length: 100,default: null  })
  len: string;


  public softDelete(){
     this.deletedAt= new Date().toString()
  return this
     
  }
}
