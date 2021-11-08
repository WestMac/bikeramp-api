import { Controller, Post, Body } from '@nestjs/common';
import { AddTripDto } from '../dto/AddTripDto';
import { TripsService } from './trips.service';


@Controller('api')
export class TripsController {
  constructor(
    private readonly tripsService: TripsService
  ) {}

  @Post('trips')
  async addTrip(@Body() addTripDto: AddTripDto) {
    return await this.tripsService.insertTrip(addTripDto)
  }
}
