import { HttpService } from '@nestjs/axios';
import { Controller, Post, Get, Body } from '@nestjs/common';
import { Observable, Subscription } from 'rxjs';
import { AddTripDto } from './dto/AddTripDto';
import { TripModel } from './trip.model';
import { TripsService } from './trips.service';

@Controller('api')
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
    private httpService: HttpService
  ) {}

  @Post('trips')
  async addTrip(@Body() addTripDto: AddTripDto): Promise<Subscription> {
    return this.httpService
    .get(process.env.API_URL +
        '&destinations=' + addTripDto.destination +
        '&origins=' + addTripDto.start +
        '&key=' + process.env.API_KEY)
    .subscribe((res) => {
        try {
        let distance = +res.data.rows[0].elements[0].distance.text.replace('km','')
        return this.tripsService.insertTrip(new TripModel(+distance,addTripDto.start,addTripDto.destination,+addTripDto.price,addTripDto.date))
    } catch (e) {
            console.log('error')
        }
    })
  }
  @Get('stats/weekly')
async getWeekly(): Promise<any> {
  return (await this.tripsService.getWeekly())[0];
}
@Get('stats/monthly')
async getMonthly(): Promise<any> {
  return await this.tripsService.getMonthly();
}
}
