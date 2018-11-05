import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//importação do arquivo usuario criado a cima
//import { Usuario } from '../../app/models/usuario';
import { ConfigProvider } from '../../providers/config/config';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FavoritosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
  providers: [
    ConfigProvider,
  ]
})
export class FavoritosPage {

  public lista_filmes = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configProvider: ConfigProvider,
    public movieProvider: MoovieProvider
  ) {
  }

  carregarFavoritos() {
    this.lista_filmes = [];
    var filmes = this.configProvider.getFavoriteData();

    filmes.forEach(element => {
      this.movieProvider.getMovieDetails(element).subscribe(data => {
        let retorno = (data as any)._body;
        this.lista_filmes.push(JSON.parse(retorno));
      }, error => {
        console.log(error);
      })
    });
  }

  atualizar() {
    this.carregarFavoritos();
  }

  abrirDetalhes(filme) {
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  ionViewDidLoad() {
    this.carregarFavoritos();
  }

}
