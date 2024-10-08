import { BaseEntityWithId } from '../../abstract';
import { IBranch, IStaff } from 'src/types';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany,PrimaryGeneratedColumn ,BaseEntity} from 'typeorm';
import { Staff } from '../staff.entity';
@Entity()
export class Branch  extends BaseEntity  implements IBranch {


  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  branchId: string;

  @ManyToOne(() => Staff, (staff) => staff.id)
  @JoinColumn()

  staff: Staff;




  
}
