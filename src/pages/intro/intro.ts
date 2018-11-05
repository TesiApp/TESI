import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { Slides } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { ConfigProvider } from '../../providers/config/config';

//importação do arquivo criado a cima
import { SessionProvider } from '../../providers/session/session';

//importação do arquivo usuario criado a cima
import { Usuario } from '../../app/models/usuario';

/**
 * Generated class for the IntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
  providers: [
    MoovieProvider,
    ConfigProvider
  ]
})

export class IntroPage {
  @ViewChild(Slides) slides: Slides;

  usuario: Usuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public session: SessionProvider) {
  }

  criaSession() {
    this.usuario = new Usuario();
    this.usuario.codigo = 1;
    this.usuario.nome = 'Puc Minas';
    this.usuario.email = 'pucminas@pucminas.com';
    this.usuario.login = 'pucminas';
    this.usuario.senha = 'pucbarreiro';
    this.usuario.favoritos = [];
    //disparando a sessão
    this.session.create(this.usuario);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  goToTabsPage() {
    this.navCtrl.push(TabsPage)
  }

  goToSlideNext() {
    this.slides.slideNext();
  }

  goToSlidePrev() {
    this.slides.slidePrev();
  }

  Login() {
    this.criaSession();
    // this.configProvider.getToken().subscribe(
    //   data => {
    //     const response = (data as any);
    //     const objeto_retorno = JSON.parse(response._body);
    //     this.configProvider.setTokenData(objeto_retorno.request_token);

    //     this.configProvider.createSession(objeto_retorno.request_token).subscribe(
    //       data => {
    //         const response_session = (data as any);
    //         const objeto_retorno_session = JSON.parse(response_session._body);
    //         this.configProvider.setSessionData(objeto_retorno_session.session_id);

    //         // this.movieProvider.getDetailsSession(objeto_retorno.guest_session_id).subscribe(
    //         //   data => {
    //         //     const responseSession = (data as any);
    //         //     const objeto_retornoSession = JSON.parse(responseSession._body);
    //         //     console.log(objeto_retornoSession);
    //         //   },
    //         //   error => {

    //         //   }
    //         // )
    //         this.goToTabsPage();
    //       }, error => {
    //         console.log(error);
    //       }
    //     )

    //   }, error => {

    //   }
    // );


    this.goToTabsPage();
    /*var token = this.configProvider.getToken();
    console.log(token);
    this.movieProvider.createSession(token).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.configProvider.setSessionData(objeto_retorno.guest_session_id, objeto_retorno.expires_at);

        this.movieProvider.getDetailsSession(objeto_retorno.guest_session_id).subscribe(
          data => {
            const responseSession = (data as any);
            const objeto_retornoSession = JSON.parse(responseSession._body);
            console.log(objeto_retornoSession);
          },
          error => {

          }
        )
        this.goToTabsPage();
      }, error => {
        console.log(error);
      }
    )*/

  }
}
