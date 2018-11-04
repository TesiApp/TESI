import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MoovieProvider {
  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }

  getLatestMovies(page = 1) {
    return this.http.get(this.baseApiPath + '/movie/popular?page=${page}&api_key=' + this.getApiKey() + '&language=pt-BR');
  }

  getMovieDetails(filmeid) {
    return this.http.get(this.baseApiPath + '/movie/' + filmeid + '?api_key=' + this.getApiKey() + '&language=pt-BR');
  }





  getDetailsSession(session_id) {
    return this.http.get(this.baseApiPath + '/account?session_id=' + session_id + '&api_key=' + this.getApiKey() + '&language=pt-BR');
  }

  addFavorite(session_id, filme_id) {
    return this.http.post(this.baseApiPath + '/account/null/favorite?session_id=' + session_id + '&api_key=' + this.getApiKey(),
      {
        "media_type": "movie",
        "media_id": filme_id,
        "favorite": true
      }
    );
  }

  getApiKey(): string {

    return "51e4e9d52532d389174b5252cd99d33d";

  }

}
