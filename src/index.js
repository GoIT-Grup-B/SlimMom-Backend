import { initMongoDB } from "./db/initMongoDB";

const bootstrap= async()=>{
    await initMongoDB();
}

bootstrap();