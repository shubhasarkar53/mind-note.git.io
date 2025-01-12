export default class ErrorHandler extends Error{
    statusCode: number;
    constructor(message:string,statusCode:number){
        super(message);
        this.statusCode = statusCode;
    }
}