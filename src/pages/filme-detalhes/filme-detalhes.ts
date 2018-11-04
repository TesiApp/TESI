import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { ConfigProvider } from '../../providers/config/config';

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
  providers: [MoovieProvider, ConfigProvider]
})
export class FilmeDetalhesPage {
  public filme;
  public filmeid;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public movieProvider: MoovieProvider,
    public configProvider: ConfigProvider
  ) {
  }

  addFavorite() {
    this.filmeid = this.navParams.get("id");
    var session = JSON.parse(this.configProvider.getSessionData());
    console.log(session);

    this.movieProvider.addFavorite(session.id_session, this.filmeid).subscribe(data => {
      let retorno = (data as any)._body;
      this.filme = JSON.parse(retorno);
      console.log(this.filme);
    }, error => {
      console.log(error);
    })
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
  }

}
