import { Injectable } from '@nestjs/common';
import { TripModel } from './trip.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from '../entities/trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private tripRepository: Repository<Trip>
  ) {}

  async insertTrip(TripModel: TripModel): Promise<Trip> {
    const newTrip = this.tripRepository.create(TripModel);
    return await this.tripRepository.save(newTrip);
  }
}
