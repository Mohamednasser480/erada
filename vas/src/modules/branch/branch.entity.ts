import { Column, Entity, OneToMany, JoinColumn, DeleteDateColumn } from 'typeorm';
import { BaseEntityWithId, BaseEntityWithMeta } from '../../abstract';

@Entity()
export class Branch extends BaseEntityWithId {
  @Column({ type: 'varchar', length: 100})
  name: string;

  @Column({ type: 'varchar', default: "active",length: 15 })
  status: string;

  @Column({ type: 'varchar', length: 100,})
  managerId: string;

  @Column({ type: 'varchar',length: 100 })
  area: string;

  @Column({ type: 'varchar',length: 100 })
  government: string;

  @Column({ type: 'varchar',length: 100 , default: null })
  lat: string;

  @Column({ type: 'varchar',length: 100,default: null  })
  len: string;

  @Column({ type: 'varchar',length: 100,default: null  })
  street: string;

  @Column({ type: 'varchar',length: 100,default: null  })
  city: string;

  @Column({ type: 'varchar',length: 100,default: null  })
  buildingNO: string;

  @Column({ type: 'varchar',length: 100,default: null  })
  landmark: string;

  public softDelete(){
     this.deletedAt= new Date().toString()
  return this
     
  }
}
