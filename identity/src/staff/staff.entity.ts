import { BaseEntityWithId } from '../abstract';
import { IStaff } from 'src/types';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany, TreeParent, TreeChildren, Tree } from 'typeorm';
import { Role } from 'src/role/role.entity';
import { Group } from 'src/group/group.entity';
import { Branch } from './branch/branch.entity';

@Entity()
@Tree("nested-set")

export class Staff extends BaseEntityWithId implements IStaff {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  staffId: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  phone: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @ManyToOne(() => Role, {
    eager: true,
    nullable: true,
  })
  
  @JoinColumn()
  role: string;
  
  @ManyToOne(() => Staff, (manager) => manager.employees, { nullable: true })
  manager: Staff;

  @OneToMany(() => Staff, (employee) => employee.manager)
  employees: Staff[];

  @OneToMany(() => Branch, (branch) => branch.staff, { nullable: true })
  branchs: string[];

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @ManyToOne(() => Group, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  group: string;
}
