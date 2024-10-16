import {  Injectable, Scope } from '@nestjs/common';
import CircuitBreaker from 'src/serviceprovider/CircuitBreaker';
import { CustomErrorHandle } from 'src/serviceprovider/ErrorException/customErrorHandle';
import objectToQueryString from "../../../helpers/objectToQueryString";

@Injectable({ scope: Scope.REQUEST })
export class ProductService {
    private VAS_URL: string = `http://${process.env.VAS_HOST}:${process.env.VAS_PORT}`
    private circuitBreaker = new CircuitBreaker(5, 2, 5000);

    async createProduct(body: any): Promise<any> {
        try {
            const request = {
                method: 'post',
                url: `${this.VAS_URL}/products`,
                data: body,
            };
            return await this.circuitBreaker.send(request)
        } catch (error) {
            console.log("error in create product gateway service", error.message);
            CustomErrorHandle.customErrorHandle(error)
        }
    }

    async findAllProducts(data: any): Promise<any> {
        try {
            let query:string = objectToQueryString(data)
            const request = {
                method: 'get',
                url: `${this.VAS_URL}/products/all${query}`,
                data: {},
            };
            return await  this.circuitBreaker.send(request)
        } catch (error) {
            console.log("error",error.message);
            CustomErrorHandle.customErrorHandle(error)
        }
    }

    async getProductWorkflows(): Promise<any> {
        try {
            const request = {
                method: 'get',
                url: `${this.VAS_URL}/products/workflows`,
            };
            return await  this.circuitBreaker.send(request)
        } catch (error) {
            console.log("error",error.message);
            CustomErrorHandle.customErrorHandle(error)
        }
    }

}