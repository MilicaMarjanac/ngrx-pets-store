import { Injectable } from "@angular/core";
import { Pet } from "../models/pet";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PetService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  public getPets(): Observable<Pet[]> {
    return this.http
      .get<Pet>(`http://localhost:3000/pets`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public createPet(pet: Pet): Observable<Pet> {
    return this.http
      .post<Pet>("http://localhost:3000/pets", pet, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public editPet(pet: Pet): Observable<Pet> {
    return this.http
      .put<Pet>(`http://localhost:3000/pets/${pet.id}`, pet, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(() => error);
  }
}
