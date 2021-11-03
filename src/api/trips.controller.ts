import { HttpService } from '@nestjs/axios';
import { Controller, Query, Post, Get } from '@nestjs/common';
import { TripModel } from './trip.model';
import { TripsService } from './trips.service';

@Controller('api')
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
    private httpService: HttpService,
  ) {}

  @Post('trips')
  async addTrip(
    @Query('start_address') start: string,
    @Query('destination_address') destination: string,
    @Query('price') price: number,
    @Query('date') date: Date,
  ) {
    this.httpService
        .get(process.env.API_URL +
            '&destinations=' + destination +
            '&origins=' + start +
            '&key=' + process.env.API_KEY)
        .subscribe((res) => {
            let distance = +res.data.rows[0].elements[0].distance.text.replace('km','')
            return this.tripsService.insertTrip(new TripModel(+distance,+price,date))
        })
  }

  @Get('stats/weekly')
  async getWeekly() {
    return (await this.tripsService.getWeekly())[0]
  }
  @Get('stats/monthly')
  async getMonthly() {
    return (await this.tripsService.getMonthly())
  }
}
