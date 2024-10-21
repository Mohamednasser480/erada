import { BaseEntityWithId } from '../abstract';
import { IGroup } from '../types';
import { Column, Entity, OneToMany, JoinColumn } from 'typeorm';
import { Staff } from 'src/staff/staff.entity';

@Entity()
export class Group extends BaseEntityWithId implements IGroup {
  @Column({ type: 'varchar', length: 100, default: null })
  name: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Staff, (staff) => staff.group, {onUpdate: 'CASCADE'})
  @JoinColumn()
  staff: Staff[];
}
