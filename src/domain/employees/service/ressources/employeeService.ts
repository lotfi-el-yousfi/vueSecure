import { Employee } from '../../model/Employee'
import axios from 'axios'
import { Observable } from 'rxjs'
import { useEmployee } from '../../store/employeeStore'

const ApiUrl = 'http://localhost:9090'


export function Login(username: string, password: string): Observable<string> {
  return new Observable(observer => {
    axios.post(ApiUrl + '/login', { username, password })
      .then(response => {
        const token = response?.data?.token
        if (token) {
          useEmployee().setToken(token)
          observer.next(token)
        } else {
          observer.error(new Error('No token returned'))
        }
      })
      .catch(error => observer.error(error))
  })
}

export function GetData(): Observable<Employee[]> {
  return new Observable(observer => {
    axios.get(ApiUrl + '/employees/')
      .then(response => observer.next(response?.data))
      .catch(error => observer.error(error))
  })
}
export function addEmployee(employee: Employee): Observable<Employee> {
  return new Observable(observer => {
    axios.post(ApiUrl + '/employees/', employee)
      .then(response => observer.next(response.data))
      .catch(error => observer.error(error))
  })
}
export function updateEmployee(employee: Employee): Observable<Employee> {
  return new Observable(observer => {
    axios.post(ApiUrl + '/employees/', employee)
      .then(response => observer.next(response.data))
      .catch(error => observer.error(error))
  })
}

export function deleteEmployee(id: number): Observable<void> {
  return new Observable(observer => {
    axios.delete(ApiUrl + '/employees/' + id)
      .then(response => observer.next())
      .catch(error => observer.error(error))
  })
}
