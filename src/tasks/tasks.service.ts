import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1'
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks():Task[] {
        return this.tasks;
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

    deleteTask(id:string):Task[] {
        this.tasks = this.tasks.filter((task) => {
            return task.id !== id;
        })

        return this.tasks;
    }

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
