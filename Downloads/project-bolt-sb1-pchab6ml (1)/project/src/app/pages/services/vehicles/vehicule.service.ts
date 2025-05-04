import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';

export interface Vehicule {
  id?: number;
  longitude: number | null;
  latitude: number | null;
  marque: string;
  modele: string;
  anneeFabrication: number | null;
  kilometrage: number | null;
  numeroSerie: string;
  image:string;
  couleur: string;
  typeCarburant: string;
  prix: number | null;
  caracteristiquesSupplémentaires: string;
}

@Injectable({
  providedIn: 'root',
})
export class VehiculeService {
  private apiUrl = '/api/vehicules';
  private apiUrl2 = '/api/rapportExpert'; // Correct the route to match the backend

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur inconnue est survenue !';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur côté client : ${error.error.message}`;
    } else {
      errorMessage = `Erreur côté serveur - Code : ${error.status}\nMessage : ${error.message}`;
    }
    console.error('Erreur HTTP complète :', error);
    return throwError(() => new Error(errorMessage));
  }

  getVehicles(): Observable<Vehicule[]> {
    console.log('Fetching vehicles from:', `${this.apiUrl}`);
    return this.http.get(this.apiUrl, { ...this.httpOptions, responseType: 'text' }).pipe(
      map(response => {
        try {
          return JSON.parse(response) as Vehicule[];
        } catch (e) {
          console.error('Error parsing response:', response);
          console.error('Parse error:', e);
          throw new Error('Failed to parse response');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          error: error.error,
          raw: error
        });
        return this.handleError(error);
      })
    );
  }

  getVehicleById(id: string): Observable<Vehicule> {
    return this.http.get<Vehicule>(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      map((vehicule) => {
        // Map the backend field to the frontend model       caracteristiquesSupplementaires
        vehicule.caracteristiquesSupplémentaires = vehicule['caracteristiquesSupplémentaires'];
        return vehicule;
      }),
      catchError(this.handleError)
    );
  }

  getFilteredVehicles(filters: any): Observable<Vehicule[]> {
    return this.http.post<Vehicule[]>(`${this.apiUrl}/filter`, filters, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateFilters(filters: any): Observable<Vehicule[]> {
    return this.getFilteredVehicles(filters);
  }

  addVehicule(vehicule: Vehicule): Observable<Vehicule> {
    return this.http.post<Vehicule>(this.apiUrl, vehicule, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  addVehiculeWithLocation(vehicule: Vehicule): Observable<Vehicule> {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported.');
      return this.addVehicule(vehicule);
    }
  
    const getPosition = new Observable<GeolocationPosition>((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position);
          observer.complete();
        },
        (error) => {
          console.error('Error getting location:', error);
          observer.error(error);
        }
      );
    });
  
    return getPosition.pipe(
      mergeMap((position) => {
        vehicule.latitude = position.coords.latitude;
        vehicule.longitude = position.coords.longitude;
        return this.addVehicule(vehicule);
      })
    );
  }
  
  updateVehicule(vehicule: Vehicule): Observable<Vehicule> {
    if (!vehicule.id) {
      return throwError(() => new Error('ID du véhicule requis pour la mise à jour.'));
    }
    return this.http.put<Vehicule>(`${this.apiUrl}/${vehicule.id}`, vehicule, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteVehicule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  sendReportRequest(vehicleId: number): Observable<any> {
    const requestData = { vehicule_id: vehicleId };
    return this.http.post(`${this.apiUrl2}/requestReport`, requestData, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
