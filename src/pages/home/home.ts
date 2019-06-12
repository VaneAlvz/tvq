import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoviesPage } from '../movies/movies';
import { NewsPage } from '../news/news';
import { LivePage } from '../live/live';
import { SocialPage } from '../social/social';
import { SportsPage } from '../sports/sports';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  movies() {
    this.navCtrl.push(MoviesPage);
  }

  news() {
    this.navCtrl.push(NewsPage);
  }

  live() {
    this.navCtrl.push(LivePage);
  }

  social() {
    this.navCtrl.push(SocialPage);
  }

  sport() {
    this.navCtrl.push(SportsPage);
  }

}
