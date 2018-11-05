import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoovieProvider } from "../../providers/moovie/moovie";
import { NavParams, LoadingController } from 'ionic-angular';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

import { Storage } from "@ionic/storage";

//importação do arquivo criado a cima
import { SessionProvider } from '../../providers/session/session';

//importação do arquivo usuario criado a cima
//import { Usuario } from '../../app/models/usuario';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    MoovieProvider,
    SessionProvider
  ]
})
export class HomePage {

  public lista_filmes = new Array<any>();
  public page = 1;

  public nome_usuario: string = "Charles Franca do Codigo";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController,
    public session: SessionProvider,
    public storage: Storage
  ) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  fechaCarregando() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  abrirDetalhes(filme) {
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  carregarFilmes(newpage: boolean = false) {
    this.abreCarregando();
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);

        if (newpage) {
          this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
          console.log(this.page);
          console.log(this.lista_filmes);
        } else {
          this.lista_filmes = objeto_retorno.results;
        }

        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);
        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

  ionViewDidEnter() {
    this.carregarFilmes(false);
  }

}
