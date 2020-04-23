import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "src/tasks/task.model";
//To be added in controller
export class TaskStatusValidationPipe implements PipeTransform{
    
    readonly allowedStatuses = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN,
    ]

    transform(value:any){
        value = value.toUpperCase();
        
        if (this.isStatusValid(value)) {
            return value;
        }
        
        throw new BadRequestException(`${value} is an invalid status!`);
    }

    private isStatusValid(status:any){
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}