import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Movie1Page } from '../movie1/movie1';
import { Movie2Page } from '../movie2/movie2';
import { Movie3Page } from '../movie3/movie3';
import { Movie4Page } from '../movie4/movie4';
import { Movie5Page } from '../movie5/movie5';
/**
 * Generated class for the MoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoviesPage');
  }

  back() {
    this.navCtrl.pop();
  }

  mov1() {
    this.navCtrl.push(Movie1Page);
  }

  mov2() {
    this.navCtrl.push(Movie2Page);
  }

  mov3() {
    this.navCtrl.push(Movie3Page);
  }

  mov4() {
    this.navCtrl.push(Movie4Page);
  }

  mov5() {
    this.navCtrl.push(Movie5Page);
  }

}
