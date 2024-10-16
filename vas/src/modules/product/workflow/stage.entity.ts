import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from 'typeorm';
import { Workflow } from './workflow.entity';

@Entity()
export class WorkflowStages {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ManyToOne(() => Workflow, (workflow) => workflow.stages)
    @JoinColumn({ name: 'workflowId' })
    workflow: Workflow;
}
