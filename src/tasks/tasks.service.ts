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

    // // SECTION - This has all the GET requests
    // getAllTasks():Task[] {
    //     return this.tasks;
    // }

    
    // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[]{
    //     const {status, search} = filterDto;

    //     let tasks = this.getAllTasks();

    //     if(status){
    //         tasks = tasks.filter((task) => {return task.status === status})
    //     }

    //     if (search) {
    //         tasks = tasks.filter((task) => {
    //             return (task.title.includes(search) ||
    //             task.description.includes(search))
    //         })
    //     }

    //     return tasks;
    // }

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

    // // SECTION - This is the delete
    // deleteTask(id:string):Task[] {
    //     const found = this.getTaskById(id);

    //     this.tasks = this.tasks.filter((task) => {
    //         return task.id !== found.id;
    //     })
    //     return this.tasks;
    // }

    // // SECTION - This has patch requests
    // updateTaskStatus(id: string, status:TaskStatus){
    //     let index = this.tasks.findIndex((task) => {
    //         return task.id === id;
    //     })
    //     if (index!=-1) {
    //         this.tasks[index].status = status;
    //         return this.tasks[index];    
    //     }

    //     throw new NotFoundException(`Task with ID: ${id} not found!`);
        
    // }
}
