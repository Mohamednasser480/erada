import {  Injectable, Scope } from '@nestjs/common';
import CircuitBreaker from 'src/serviceprovider/CircuitBreaker';
import { CustomErrorHandle } from 'src/serviceprovider/ErrorException/customErrorHandle';
import objectToQueryString from "../../../helpers/objectToQueryString";

@Injectable({ scope: Scope.REQUEST })
export class InsuranceCompanyService {
    private VAS_URL: string = `http://${process.env.VAS_HOST}:${process.env.VAS_PORT}`
    private circuitBreaker = new CircuitBreaker(5, 2, 5000);

    async createInsuranceCompany(body: any): Promise<any> {
        try {
            const request = {
                method: 'post',
                url: `${this.VAS_URL}/insurance-companies`,
                data: body,
            };
            return await this.circuitBreaker.send(request)
        } catch (error) {
            console.log("error", error.message);
            CustomErrorHandle.customErrorHandle(error)
        }
    }

    async findAllInsuranceCompanies(data: any): Promise<any> {
        try {
            let query:string = objectToQueryString(data)
            const request = {
                method: 'get',
                url: `${this.VAS_URL}/insurance-companies/all${query}`,
                data: {},
            };
            return await  this.circuitBreaker.send(request)
        } catch (error) {
            console.log("error",error.message);
            CustomErrorHandle.customErrorHandle(error)
        }
    }

    async updateInsuranceCompany(id: string, body:any): Promise< any > {
        try {
            const request = {
                method: 'patch',
                url: `${this.VAS_URL}/insurance-companies/${id}`,
                data: body,
            };
            return await this.circuitBreaker.send(request)
        } catch (error) {
            console.log("error", error.message);
            CustomErrorHandle.customErrorHandle(error)
        }
    }

    async updateInsuranceCompanyStatus(id: string): Promise<any> {
        try {
            const request = {
                method: 'patch',
                url: `${this.VAS_URL}/insurance-companies/status/${id}`,
            };
            return await this.circuitBreaker.send(request)
        } catch (error) {
            console.log("error", error.message);
            CustomErrorHandle.customErrorHandle(error)
        }
    }
}