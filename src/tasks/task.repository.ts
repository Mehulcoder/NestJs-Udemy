import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class Taskrepository extends Repository<Task>{

}