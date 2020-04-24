import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const typeormconfig: TypeOrmModuleOptions = {
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password: 
}