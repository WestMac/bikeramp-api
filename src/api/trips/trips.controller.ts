import { HttpService } from '@nestjs/axios';
import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, Subscription } from 'rxjs';
import { Repository } from 'typeorm';
import { AddTripDto } from '../dto/AddTripDto';
import { Trip } from '../entities/trip.entity';
import { TripModel } from './trip.model';
import { TripsService } from './trips.service';


@Controller('api')
export class TripsController {
  constructor(
    @InjectRepository(Trip) private tripRepository: Repository<Trip>,
    private readonly tripsService: TripsService
  ) {}

  @Post('trips')
  async addTrip(@Body() addTripDto: AddTripDto) {
    return await this.tripsService.insertTrip(addTripDto)
  }
}
