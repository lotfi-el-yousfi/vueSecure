import { Employee } from '../../model/Employee'
import axios from 'axios'
import { Observable } from 'rxjs'

const ApiUrl = 'http://localhost:3000/'
export function Login (): Observable<string> {
  return new Observable(observer => {
    axios.get(ApiUrl + 'login')
    .then(response => 
      observer.next(response?.data[0].token))
      .catch(error => observer.error(error))
  })
}

export function GetData (): Observable<Employee[]> {
  return new Observable(observer => {
    axios.get(ApiUrl + 'employees/')
      .then(response => observer.next(response?.data))
      .catch(error => observer.error(error))
  })
}
export function addEmployee (employee: Employee): Observable<Employee> {
  return new Observable(observer => {
    axios.post(ApiUrl + 'employees/', employee)
      .then(response => observer.next(response.data))
      .catch(error => observer.error(error))
  })
}
export function updateEmployee (employee: Employee): Observable<Employee> {
  return new Observable(observer => {
    axios.post(ApiUrl + 'employees/', employee)
      .then(response => observer.next(response.data))
      .catch(error => observer.error(error))
  })
}

export function deleteEmployee (id: number): Observable<void> {
  return new Observable(observer => {
    axios.delete(ApiUrl + 'employees/' + id)
      .then(response => observer.next())
      .catch(error => observer.error(error))
  })
}
