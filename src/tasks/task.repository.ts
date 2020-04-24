import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task.status.enum";

@EntityRepository(Task)
export class Taskrepository extends Repository<Task>{
    async createTask(CreateTaskDto: CreateTaskDto){
        const task = new Task();
        const {title, description} = CreateTaskDto;

        task.description = description;
        task.status = TaskStatus.OPEN;
        task.title = title;
        await task.save();
        return task;
    }

}