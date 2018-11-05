import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  private baseApiPath = "https://api.themoviedb.org/3";
  // private config = {
  //   showSlide: false,
  //   name: "",
  //   username: ""
  // }

  constructor(public http: Http) {

  }

  // Recupera os dados do localstorage
  getConfigData(): any {
    return localStorage.getItem(config_key_name);
  }

  // Grava os dados do localstorage
  setConfigData(showSlide?: boolean, name?: string, username?: string) {
    let config = {
      showSlide: false,
      name: "",
      username: ""
    };

    if (showSlide) {
      config.showSlide = showSlide;
    }

    if (name) {
      config.name = name;
    }

    if (username) {
      config.username = username;
    }

    localStorage.setItem(config_key_name, JSON.stringify(config));
  }

  setSessionData(id_session: string) {
    let session = {
      id_session: "",
    };

    session.id_session = id_session;

    localStorage.setItem('session', JSON.stringify(session));
  }

  getSessionData(): any {
    return localStorage.getItem('session');
  }

  getToken() {
    return this.http.get(this.baseApiPath + '/authentication/token/new?api_key=' + this.getApiKey());
    /*console.log(token);
    localStorage.setItem('token', JSON.stringify(token));
    return JSON.parse('{ "token": ' + token + ' }');*/
  }

  setTokenData(token) {
    localStorage.setItem('token', token);
    return true;
  }

  getTokenData(): any {
    return localStorage.getItem('token');
  }

  createSession(token) {
    console.log(token)
    return this.http.post(this.baseApiPath + '/authentication/session/new?api_key=' + this.getApiKey(),
      {
        "request_token": token
      }
    );
  }

  setFavoriteData(id_filme) {
    var filmes = this.getFavoriteData();
    var add = true;
    if (filmes != null) {
      let favorites = filmes;
      if (favorites.indexOf(id_filme) < 0) {
        favorites.push(id_filme);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      } else {
        favorites.splice(favorites.indexOf(id_filme), 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        add = false;
      }
    } else {
      let favorites = [];
      favorites.push(id_filme);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    return add;
  }

  getFavoriteData() {
    return JSON.parse(localStorage.getItem('favorites'));
  }

  getApiKey(): string {
    return "51e4e9d52532d389174b5252cd99d33d";
  }
}
