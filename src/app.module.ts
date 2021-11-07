import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from '../ormconfig'
import { TripsModule } from './api/trips/trips.module';
import { StatsModule } from './api/stats/stats.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), TripsModule, StatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
