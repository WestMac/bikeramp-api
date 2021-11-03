import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from '../ormconfig'
import { TripsModule } from './api/trips.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), TripsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
