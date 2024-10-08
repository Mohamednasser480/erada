import { Column, Entity, ManyToOne, JoinColumn} from 'typeorm';
import { BaseEntityWithMeta } from '../../abstract';
import { InsuranceCompanyEntity } from '../insuranceCompany/insuranceCompany.entity';

@Entity()
export class InsurancePolicyEntity extends BaseEntityWithMeta {
    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'decimal' })
    amount: number;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date' })
    endDate: Date;

    @ManyToOne(() => InsuranceCompanyEntity, company => company.policies, { nullable: false })
    @JoinColumn({ name: 'insuranceCompanyId' })
    insuranceCompany: InsuranceCompanyEntity;
    @Column({ type: 'uuid', name: 'insuranceCompanyId' })
    insuranceCompanyId: string;
}
