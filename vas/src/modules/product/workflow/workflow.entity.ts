import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkflowStages } from './stage.entity';

@Entity()
export class Workflow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToMany(() => WorkflowStages, (stage) => stage.workflow, { cascade: true, eager: true})
    stages: WorkflowStages[];
}
