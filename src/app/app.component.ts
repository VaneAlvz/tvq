import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { InicioPage } from '../pages/inicio/inicio';
import { AuthService } from '../services/auth';
import { UserService } from '../services/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = InicioPage;
  usuario: any = {
    nombre: '',
    correo: '',
    uid: '',
  };

  correo: string = '';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
              public splashScreen: SplashScreen, private authService: AuthService,
              public menuCtrl: MenuController, private userService: UserService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'Home', component: HomePage },
      //{ title: 'List', component: ListPage }
    ];
    
    this.authService.getStatus().subscribe((session) => {
      
      if(!session) {
        this.correo = '';
        return;
      }
      if(!session.uid) {
        this.correo = '';
        return;
      }

      this.correo = session.email;

      this.nav.setRoot(HomePage);
      this.userService.getUser(session.uid).valueChanges().subscribe((user) => {
        this.usuario = user;
        localStorage.setItem('user', JSON.stringify(this.usuario));
        console.log(user);
      }, (error) => {console.log(error)}); 
    });
  }


  logout() {
    this.authService.logout().then(() => {
      this.menuCtrl.close();
      localStorage.removeItem('user');
      this.nav.setRoot(InicioPage);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
