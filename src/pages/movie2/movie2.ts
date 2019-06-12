import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { UserService } from '../../services/user';
/**
 * Generated class for the Movie2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie2',
  templateUrl: 'movie2.html',
})
export class Movie2Page {

  user: any = JSON.parse(localStorage.getItem('user'));
  show:boolean = false;
  test: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private payPal: PayPal, private userService: UserService) {
    if(this.user){
      if(this.user.xQsxSNk34hxRJbBB){
        if(this.user.xQsxSNk34hxRJbBB == true) {
          this.show = true;
        } else {
          this.show = false;
        }   
      }       
    }
  }

  pay() {
    this.payPal.init({
      PayPalEnvironmentProduction: 'AdH3Fc1VuHv251F05-oGuSC5bUjnnnh0HzF1Rd7yKEX8HWOaTgt1aF2VoBXan71fzel614QAYLx7bd0B',
      PayPalEnvironmentSandbox: 'AZU9dkOnGJEkpbNEHQoEUze2Iqoi7Aew3xCtKvTvRz44eLTWNW2CKWc3R8vURboVr9xM2hWrVTcwOy7h'
    }).then(() => {
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({

      })).then(() => {
        let payment = new PayPalPayment('0.99', 'USD', 'La Bodega', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          this.userService.updateUser(this.user.uid, {
            xQsxSNk34hxRJbBB: true
          }).then(() => {
            this.show = true;
          });
        }, () => {
        });
      }, () => {
      });
    }, () => {
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Movie2Page');
  }

}
