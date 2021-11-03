import { Injectable } from "@nestjs/common";
import { TripModel } from "./trip.model";
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, LessThan, MoreThan, Repository } from 'typeorm';
import { Trip } from './trip.entity';


@Injectable()
export class TripsService {
    constructor(@InjectRepository(Trip) private tripRepository: Repository<Trip>) {}
  
    async insertTrip(TripModel: TripModel): Promise<Trip> {
        const newTrip = this.tripRepository.create(TripModel)
        return await this.tripRepository.save(newTrip)
    }
  
    async getWeekly() {
        return await getRepository(Trip)
            .createQueryBuilder("trip")
            .select("SUM(trip.distance) || 'km'", "total_distance")
            .addSelect("SUM(trip.price) || 'PLN'", "total_price")
            .where("trip.createdAt >= date_trunc('week',current_date)")
            .getRawMany();
        }
    
    async getMonthly() {
        return await getRepository(Trip)
        .createQueryBuilder("trip")
        .distinctOn(["day"])
        .select("TRIM(TRAILING FROM TO_CHAR(current_timestamp,'Month')) || ',' || TO_CHAR(EXTRACT(DAY FROM trip.createdAt),'9th')","day")
        .addSelect("SUM(trip.distance) over (partition by EXTRACT(DAY FROM trip.createdAt)) || 'km'","total_distance")
        .addSelect("AVG(trip.distance) over (partition by EXTRACT(DAY FROM trip.createdAt))::numeric(10,2) || 'km'","avg_ride",)
        .addSelect("AVG(trip.price) over (partition by EXTRACT(DAY FROM trip.createdAt))::numeric(10,2) || 'PLN'","avg_price",)
        .where("trip.createdAt >= date_trunc('month',current_date)")
        .getRawMany();
    }
}
