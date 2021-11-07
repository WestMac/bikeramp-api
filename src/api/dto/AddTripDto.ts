import { IsDateString, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class AddTripDto {

    @IsNotEmpty()
    @IsString()
    readonly start: string;

    @IsNotEmpty()
    @IsString()
    readonly destination: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly price: number;

    @IsNotEmpty()
    @IsDateString()
    readonly date: Date;

} 
