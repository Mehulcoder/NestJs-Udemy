import { IsNotEmpty} from 'class-validator'
// import { } from 'class-validator'

export class CreateTaskDto{
    @IsNotEmpty()
    title:string;
    @IsNotEmpty()
    description:string;
}