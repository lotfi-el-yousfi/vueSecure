import { Observable } from 'rxjs';
import axios from 'axios';
import { useEmployee } from '@/employee/stores';

const ApiUrl = "http://localhost:9090";
const employeeStore = useEmployee();
export function Login(username: string, password: string): Observable<string[]> {
    return new Observable(observer => {
        axios.post(`${ApiUrl}/login`, {
            username, password
        })
            .then(response => {
                employeeStore.setToken(response?.data?.token);
                localStorage.setItem('token', response?.data?.token);
                observer.next(response?.data);
            })
            .catch(error => observer.error(error));
    });
}
export function LoadEndpoints(): Observable<string[]> {
    return new Observable(observer => {
        axios.post(`${ApiUrl}/endpoints`,
            {}, {
            headers: { Authorization: employeeStore.token }
        })
            .then(response => {
                console.log(response?.data);
                employeeStore.setEndpoints(response?.data);
                observer.next(response?.data);
            })
            .catch(error => observer.error(error));
    });
}

export function Get_Endpoint(table: string): Observable<string[]> {
    return new Observable(observer => {
        console.log(ApiUrl + `/${table}`);
        axios.get(ApiUrl + `/${table}`,
            {
                headers: { Authorization: useEmployee().token }
            })
            .then(response => {
                observer.next(response?.data);
            })
            .catch(error => observer.error(error));
    });
}
export function Post_Endpoint(table: string, paylaod: any): Observable<string[]> {
    return new Observable(observer => {
        axios.post(ApiUrl + `/${table}`,
            paylaod,
            {
                headers: { Authorization: useEmployee().token }
            })
            .then(response => {
                observer.next(response?.data);
            })
            .catch(error => observer.error(error));
    });
}
export function Delete_Endpoint(table: string, delete_params: any): Observable<string[]> {
    return new Observable(observer => {
        axios.delete(ApiUrl + `/${table}/${delete_params}`,
            {
                headers: { Authorization: useEmployee().token }
            })
            .then(response => {
                observer.next(response?.data);
            })
            .catch(error => observer.error(error));
    });
}