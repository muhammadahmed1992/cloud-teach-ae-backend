import { Controller, Get } from "@nestjs/common";

@Controller('heart-beat')
export class HeartBeatController {
    @Get()
    public async health(){
        return 'Api is running';
    }
}