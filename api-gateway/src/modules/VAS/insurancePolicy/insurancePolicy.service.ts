import {  Injectable, Scope } from '@nestjs/common';
import CircuitBreaker from 'src/serviceprovider/CircuitBreaker';
import { CustomErrorHandle } from 'src/serviceprovider/ErrorException/customErrorHandle';
import objectToQueryString from "../../../helpers/objectToQueryString";

@Injectable({ scope: Scope.REQUEST })
export class InsurancePolicyService {
    private VAS_URL: string = `http://${process.env.VAS_HOST}:${process.env.VAS_PORT}`
    private circuitBreaker = new CircuitBreaker(5, 2, 5000);

    async createInsurancePolicy(body: any): Promise<any> {
        try {
            const request = {
                method: 'post',
                url: `${this.VAS_URL}/insurance-policies`,
                data: body,
            };
            return await this.circuitBreaker.send(request)
        } catch (error) {
            console.log("error", error.message);
            CustomErrorHandle.customErrorHandle(error)
        }
    }

    async getInsurancePolices(insuranceCompanyId: string, query: any): Promise<any> {
        try {
            query = objectToQueryString(query)
            const request = {
                method: 'get',
                url: `${this.VAS_URL}/insurance-policies/${insuranceCompanyId}${query}`,
            };
            return await this.circuitBreaker.send(request)
        } catch (error) {
            console.log("error", error.message);
            CustomErrorHandle.customErrorHandle(error)
        }
    }
    async updateInsurancePolicy(id: string, body:any): Promise< any > {
        try {
            const request = {
                method: 'patch',
                url: `${this.VAS_URL}/insurance-policies/${id}`,
                data: body,
            };
            return await this.circuitBreaker.send(request)
        } catch (error) {
            console.log("error", error.message);
            CustomErrorHandle.customErrorHandle(error)
        }
    }
}