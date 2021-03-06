import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Taskrepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';

// SECTION - This is the injection
@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Taskrepository)
        private taskRepository: Taskrepository,
    ){}

    
    getTasks(filterDto: GetTasksFilterDto){
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id:number): Promise<Task>{
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with ID: ${id} not found!`);
        }

        return found;
    }

    //!SECTION - This handles creation    
    async createTask(CreateTaskDto: CreateTaskDto) {
        return this.taskRepository.createTask(CreateTaskDto);
    }

    // SECTION - This is the delete
    async deleteTask(id:number) {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException("The task not found");
        }
        return result;

    }

    // // SECTION - This has patch requests
    async updateTaskStatus(id: number, status:TaskStatus){
        const task = await this.getTaskById(id);
        task.status = status;
        task.save();
        return task;
        
    }
}
