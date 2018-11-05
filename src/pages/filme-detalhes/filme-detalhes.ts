import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { ConfigProvider } from '../../providers/config/config';

import { Storage } from "@ionic/storage";

//importação do arquivo criado a cima
import { SessionProvider } from '../../providers/session/session';

//importação do arquivo usuario criado a cima
//import { Usuario } from '../../ app / models / usuario';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [MoovieProvider, SessionProvider, ConfigProvider]
})
export class FilmeDetalhesPage {
  public filme;
  public filmeid;
  public addorremove = 'Adicionar aos Favoritos';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public movieProvider: MoovieProvider,
    public configProvider: ConfigProvider,
    public session: SessionProvider,
    public storage: Storage
  ) {
  }

  addFavorite() {
    this.filmeid = this.navParams.get("id");
    var result = this.configProvider.setFavoriteData(this.filmeid);
    if (result) {
      this.addorremove = "Remover dos Favoritos";
    } else {
      this.addorremove = "Adicionar aos Favoritos";
    }
  }

  ionViewDidEnter() {
    this.filmeid = this.navParams.get("id");
    this.movieProvider.getMovieDetails(this.filmeid).subscribe(data => {
      let retorno = (data as any)._body;
      this.filme = JSON.parse(retorno);
      console.log(this.filme);
    }, error => {
      console.log(error);
    })

    var favoritos = this.configProvider.getFavoriteData();
    if (favoritos.indexOf(this.filmeid) >= 0) {
      this.addorremove = "Remover dos Favoritos";
    } else {
      this.addorremove = "Adicionar aos Favoritos";
    }
  }

}
