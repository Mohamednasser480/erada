import { Column, Entity, OneToMany} from 'typeorm';
import { BaseEntityWithMeta } from '../../abstract';
import {InsurancePolicyEntity} from "../insurancePolicy/insurancePolicy.entity";

@Entity()
export class InsuranceCompanyEntity extends BaseEntityWithMeta {
    @Column({ type: 'varchar', length: 100})
    name: string;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @Column({ type: 'varchar', length: 100,})
    bankName: string;

    @Column({ type: 'varchar',length: 100 })
    accountNumber: string;

    @Column({ type: 'varchar',length: 100 })
    eradaAccountNumber: string;


    @OneToMany(() => InsurancePolicyEntity, policy => policy.insuranceCompany)
    policies: InsurancePolicyEntity[];

    public softDelete(){
        this.deletedAt= new Date().toString()
        return this
    }
}
