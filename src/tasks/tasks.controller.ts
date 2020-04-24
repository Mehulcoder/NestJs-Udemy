import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    // @Get()
    // getTask(@Query(ValidationPipe) filterDto:GetTasksFilterDto):Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.getTasksWithFilter(filterDto);
    //     }
    //     return this.tasksService.getAllTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id:number){
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)   //This checks for validation inside the DTO
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.tasksService.createTask(createTaskDto);    
    }

    // @Delete('/:id')
    // deleteTask(@Param('id') id:string): Task[]{
    //     return this.tasksService.deleteTask(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(@Param('id') id:string, @Body('status',TaskStatusValidationPipe) status:TaskStatus): Task{
    //     return this.tasksService.updateTaskStatus(id, status);
    // }
}
