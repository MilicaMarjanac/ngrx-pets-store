import { Injectable } from "@angular/core";
import { Pet } from "../models/pet";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PetService {
  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private endpoint = `${environment.apiUrl}pets`;

  constructor(private http: HttpClient) {}

  public getPets(): Observable<Pet[]> {
    return this.http
      .get<Pet>(this.endpoint, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public createPet(pet: Pet): Observable<Pet> {
    return this.http
      .post<Pet>(this.endpoint, pet, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public editPet(pet: Pet): Observable<Pet> {
    return this.http
      .put<Pet>(`${this.endpoint}/${pet.id}`, pet, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(() => error);
  }
}
