import { Controller, Get } from "@nestjs/common";

@Controller()
export class HeartBeatController {
    @Get()
    public async health(){
        return 'Api is running';
    }
}