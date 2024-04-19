/**
 * Service for communication to spring boot service to call restful endpoints.
 *
 * @author Justin Swinney
 * @Date 3/25/2024
 * @version 1.0
 *
 **/

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {RescueAnimal} from "../models/rescue-animal";
import {environmentProduction} from "../../../environments/environment.production";


@Injectable({
  providedIn: 'root'
})

export class RescueAnimalService {

  private baseUrl = `${environmentProduction.apiUrl}/rescue-animals`;

  constructor(private http: HttpClient) { }

  getAllAnimals(): Observable<RescueAnimal[]> {
    return this.http.get<RescueAnimal[]>(`${this.baseUrl}/`);
  }

  getAnimalById(id: string): Observable<RescueAnimal> {
    return this.http.get<RescueAnimal>(`${this.baseUrl}/${id}`);
  }

  createNewAnimal(formData: FormData): Observable<any> {
    return this.http.post<RescueAnimal>(`${this.baseUrl}/`, formData);
  }

  updateRescueAnimal(id: string, formData: FormData): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, formData);
  }

  deleteAnimal(id: string): Observable<RescueAnimal> {
    return this.http.delete<RescueAnimal>(`${this.baseUrl}/${id}`);
  }
}
