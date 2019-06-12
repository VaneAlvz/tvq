import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InicioPage } from '../pages/inicio/inicio';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserService } from '../services/user';
import { AuthService } from '../services/auth';
import { PayPal } from '@ionic-native/paypal';
import { MoviesPage } from '../pages/movies/movies';
import { NewsPage } from '../pages/news/news';
import { LivePage } from '../pages/live/live';
import { SocialPage } from '../pages/social/social';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { Movie1Page } from '../pages/movie1/movie1';
import { Movie2Page } from '../pages/movie2/movie2';
import { Movie3Page } from '../pages/movie3/movie3';
import { Movie4Page } from '../pages/movie4/movie4';
import { Movie5Page } from '../pages/movie5/movie5';
import { SportsPage } from '../pages/sports/sports';

export const firebaseConfig = {
  apiKey: "AIzaSyCSKVaszan68KP8XbOJdrlWijTTfDJIb-0",
  authDomain: "tvquetzachapin-4a4db.firebaseapp.com",
  databaseURL: "https://tvquetzachapin-4a4db.firebaseio.com",
  projectId: "tvquetzachapin-4a4db",
  storageBucket: "tvquetzachapin-4a4db.appspot.com",
  messagingSenderId: "276638302222"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    InicioPage,
    LoginPage,
    RegisterPage,
    MoviesPage,
    NewsPage,
    LivePage,
    SportsPage,
    SocialPage,
    Movie1Page,
    Movie2Page,
    Movie3Page,
    Movie4Page,
    Movie5Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    InicioPage,
    LoginPage,
    RegisterPage,
    MoviesPage,
    NewsPage,
    LivePage,
    SportsPage,
    SocialPage,
    Movie1Page,
    Movie2Page,
    Movie3Page,
    Movie4Page,
    Movie5Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AuthService,
    GooglePlus,
    Facebook,
    PayPal
  ]
})
export class AppModule {}
