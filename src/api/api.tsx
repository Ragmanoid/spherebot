import axios from 'axios'
import { toast } from 'react-toastify'

export default class Api {
    constructor() {
    }

    genConfig() {
        return {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            timeout: 3000
        }
    }

    async request(req: string, needLog: Boolean = true, ip: string = '', request: string = '') {
        const success = (res: any) => {
            return {
                data: res.data,
                type: 'server',
                success: true
            }
        }

        const error = (error: any) => {
            if (error.response)
                return {
                    ...error.response.data,
                    code: error.response.status,
                    success: false,
                    type: 'server'
                }

            if (needLog)
                toast.error('Error connection')

            return {
                success: false,
                result: error.data,
                errorMessage: 'Network error',
                type: 'network'
            }
        }

        const newIp = ip || localStorage.getItem('spherebotIp')

        let url = `http://${newIp}/${req}`

        if (request)
            url = request

        return await axios.get(url, this.genConfig())
            .then(success)
            .catch(error)
    }

    async startMotor(command: number[]) {
        return await this.request(`motor?var=${command.join(',')}`);
    }

    async check(ip: string) {
        return await this.request('check', false, ip)
    }
}