import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from "@nestjs/axios";
import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";
import { Trip } from "../entities/trip.entity";



@Module({
    imports: [
        TypeOrmModule.forFeature([Trip]),
        HttpModule
    ],
    controllers: [StatsController],
    providers: [StatsService],

})
export class StatsModule {}