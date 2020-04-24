import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taskrepository } from './task.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([Taskrepository])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
