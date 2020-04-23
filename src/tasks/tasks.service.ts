import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// SECTION - This is the injection
@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    // SECTION - This has all the GET requests
    getAllTasks():Task[] {
        return this.tasks;
    }

    getTasksWithFilter(filterDto: GetTasksFilterDto): Task[]{
        const {status, search} = filterDto;

        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter((task) => {return task.status === status})
        }

        if (search) {
            tasks = tasks.filter((task) => {
                return (task.title.includes(search) ||
                task.description.includes(search))
            })
        }

        return tasks;
    }

    getTaskById(id:string): Task{
        return this.tasks.find((task) => {
            return task.id === id;
        });
    }

    
    createTask(CreateTaskDto: CreateTaskDto):Task {
        const {title, description} = CreateTaskDto;

        const task:Task = {
            id: uuid(),
            title,
            description, 
            status:TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    // SECTION - This is the delete
    deleteTask(id:string):Task[] {
        this.tasks = this.tasks.filter((task) => {
            return task.id !== id;
        })

        return this.tasks;
    }

    // SECTION - This has patch requests
    updateTaskStatus(id: string, status:TaskStatus){
        let index = this.tasks.findIndex((task) => {
            return task.id === id;
        })
        if (index!=-1) {
            this.tasks[index].status = status;
            return this.tasks[index];    
        }

        throw new Error("Task not found");
        
    }
}
