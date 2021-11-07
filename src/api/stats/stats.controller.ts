import { Controller, Get } from "@nestjs/common"
import { StatsService } from "./stats.service";



@Controller('api')
export class StatsController {
    
    constructor(private readonly statsService: StatsService) {}

    @Get('stats/weekly')
    async getWeekly(): Promise<{}>     {
        return (await this.statsService.getWeekly())[0];
    }

    @Get('stats/monthly')
    async getMonthly(): Promise<{}> {
        return await this.statsService.getMonthly();
    }
}