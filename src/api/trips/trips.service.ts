import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TripModel } from './trip.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from '../entities/trip.entity';
import { HttpService } from '@nestjs/axios';
import { map, Subscription } from 'rxjs';
import { AddTripDto } from '../dto/AddTripDto';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private tripRepository: Repository<Trip>,private httpService: HttpService
  ) {}

  async insertTrip(addTripDto: AddTripDto) {
    return this.httpService
    .get(process.env.API_URL +
        '&destinations=' + addTripDto.destination.normalize("NFD").replace(/\p{Diacritic}/gu, "") +
        '&origins=' + addTripDto.start.normalize("NFD").replace(/\p{Diacritic}/gu, "") +
        '&key=' + process.env.API_KEY)
    .pipe(map(async (res) => {
      try {
      let distance = +res.data.rows[0].elements[0].distance.text.replace('km','')
      let newTrip = new TripModel(+distance,addTripDto.start,addTripDto.destination,+addTripDto.price,addTripDto.date)
      let saveTrip = this.tripRepository.create(newTrip);
      return await this.tripRepository.save(saveTrip);
      } catch (e) {
        throw new HttpException('Wrong start or destination, Try again', HttpStatus.BAD_REQUEST);
      }
    }))
  }
}