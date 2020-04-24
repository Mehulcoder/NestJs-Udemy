import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task.status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class Taskrepository extends Repository<Task>{
    async getTasks(filterDto: GetTasksFilterDto){
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', {status})
        }

        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${search}%`})
        }

        const task = await query.getMany();
        return task;
    }

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