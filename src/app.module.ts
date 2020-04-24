import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormconfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormconfig),
    TasksModule
  ],
})
export class AppModule {}
