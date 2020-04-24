import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const typeormconfig: TypeOrmModuleOptions = {
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password: 'abcd@12345',
    database: 'taskmanagement',
    entities:[__dirname+'/../**/*.entity.{ts,js}'],
    synchronize:true,
}