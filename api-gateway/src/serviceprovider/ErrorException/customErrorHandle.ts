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
                "message": message|| "UnauthorizedException"
            },
          }, 403);
    }
    public static customErrorHandle(error: any) {
        console.log("----------------------------------------------------");
        console.log(error.response?.status);
        switch (error.response?.status) {
            case 404:
                throw new HttpException({ "status": error.response.status, error: { "case": error?.message, "message": error.response?.data?.message ?? error.response?.data, } }, error.response?.status);
            case 401:
                throw new HttpException({ "status": error.response.status, error: { "case": error?.message, "message": error.response?.data?.message ?? error.response?.error.message, } }, error.response?.status);
            case 403 :
                throw new HttpException( error.response|| { "status": error.response.status, error: { "case": error?.message, "message": error.response?.data?.message ?? error.response?.data, } }, error.response?.status);
            case 400:
                throw new HttpException({ "status": error.response.status, error: { "case": error?.message, "message": error.response?.data?.message ?? error.response?.data, } }, error.response?.status);
            case 500:
                throw new HttpException({ "status": error.response.status, error: { "case": error?.message, "message": error.response?.data?.message ?? error.response?.data, } }, error.response?.status);
        default:
                break;
        }


    }
}