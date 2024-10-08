import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityWithId } from '../abstract';
import { IStaff } from 'src/types';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany, TreeParent, TreeChildren, Tree } from 'typeorm';
import { Role } from 'src/role/role.entity';
import * as bcrypt from 'bcrypt';
import { Branch } from './branch/branch.entity';

@Entity()
@Tree("nested-set")

export class Staff extends BaseEntityWithId implements IStaff {
  @ApiProperty({ description: 'name' })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @ApiProperty({ description: 'name' })
  @Column({ type: 'varchar', length: 100, nullable: false })
  staffId: string;

  @ApiProperty({ description: 'Phone number' })
  @Column({ type: 'varchar', length: 15, nullable: false })
  phone: number;

  @ApiProperty({ description: 'Staff Password ' })
  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @ApiProperty({ description: 'Staff role', nullable: true })
  @ManyToOne(() => Role, {
    eager: true,
    nullable: true,
  })
  
  @JoinColumn()
  role: string;

  @TreeParent()
    manager: Staff;

   @TreeChildren()
      employees: Staff[];
      

  @OneToMany(() => Branch, (branch) => branch.staff, { nullable: true })
  
  branchs: string[];

  // @ApiProperty({ description: 'refresh token' })
  // @Column({ type: 'varchar', default: null })
  // refreshToken: string;



  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @ApiProperty({ description: 'active', nullable: false })
  @Column({ type: 'boolean', default: true })
  status: boolean;
}
