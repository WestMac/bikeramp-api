import { Module } from "@nestjs/common";
import { Trip } from "./trip.entity";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        TypeOrmModule.forFeature([Trip]),
        HttpModule
    ],
    controllers: [TripsController],
    providers: [TripsService],

})
export class TripsModule {}