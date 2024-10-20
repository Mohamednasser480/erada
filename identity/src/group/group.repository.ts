import { DataSource } from 'typeorm';
import { Group } from './group.entity';
import { BaseRepository } from '../abstract/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm'; // Import InjectDataSource

@Injectable()
export class GroupRepository extends BaseRepository<Group> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    super(Group, dataSource);
  }
}
