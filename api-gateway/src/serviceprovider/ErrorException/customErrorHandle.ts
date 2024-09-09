import { HttpException } from "@nestjs/common";

export class CustomErrorHandle {


    /**
     * unathorizedErrorHandle
     */
    public static unathorizedErrorHandle(message) {
         throw new HttpException({
            status: 403,
            error: {
                "case":"Unauthorized",
                "message":message|| "UnauthorizedException"
            },
          }, 403);
    }
    public static customErrorHandle(error) {
        // throw new HttpException({
        //     status: error.status ||400,
        //     error: error,
        //   },  error.status, {
        //     cause: error
        //   });
        console.log("----------------------------------------------------");
        console.log( error.response);

        console.log(error.response.status);
        
        switch (error.response.status) {
            case 404:
                throw new HttpException({ "status": error.response.status, error: { "case": error?.message, "message": error.response?.data?.message ?? error.response?.data, } }, error.status,);

                break;
                case 401:
                throw new HttpException({ "status": error.response.status, error: { "case": error?.message, "message": error.response?.data?.message ?? error.response?.error.message, } }, error.status,);

                break;
                case 403 :
                throw new HttpException( error.response|| { "status": error.response.status, error: { "case": error?.message, "message": error.response?.data?.message ?? error.response?.data, } }, error.status,);

                break;
                case  400:
                throw new HttpException({ "status": error.response.status, error: { "case": error?.message, "message": error.response?.data?.message ?? error.response?.data, } }, error.status,);

                break;

            default:
                break;
        }


    }
}