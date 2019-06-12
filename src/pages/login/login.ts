import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';
import { HomePage } from '../home/home';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  contrasena: string;
  correo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthService, private userService: UserService,
              public toastCtrl: ToastController, private fb: Facebook,
              public afAuth: AngularFireAuth) {
  }

  login() {
    this.authService.LoginEmail(this.correo, this.contrasena).then((user) => {
      if(user.user.emailVerified == true){
        let toast = this.toastCtrl.create({
          message: 'Bienvenido',
          duration: 3000
        });
        toast.present();
        this.navCtrl.setRoot(HomePage);
      }else{
        let toast = this.toastCtrl.create({
          message: 'Necesita verificar correo',
          duration: 3000
        });
        toast.present();
        this.authService.logout().then(() => {
          localStorage.removeItem('user');
          this.navCtrl.setRoot(LoginPage);
        });
      }
    }).catch((error) => {
      let mensaje;
      switch (error.code) {
        case "auth/invalid-email":
            mensaje = "El correo es incorrecto"
            break;
        case "auth/user-disabled":
            mensaje = "El usuario está bloqueado"
            break;
        case "auth/user-not-found":
            mensaje = "El usuario no existe"
            break;
        case "auth/wrong-password":
            mensaje = "La contraseña es incorrecta"
            break;
        default:
            mensaje = "Al parecer tu conexión no es adecuada"
            break;
      }
      let toast = this.toastCtrl.create({
        message: mensaje,
        duration: 3000
      });
      toast.present();
    });
  }

  facebook() {
    this.authService.fbLogin().then((data) => {
      const user: any = {
        nombre : data.user.displayName,
        correo: data.user.email,
        uid: data.user.uid
      }
      if(data.additionalUserInfo.isNewUser) {
        this.userService.createUser(user).then((data) => {
          const toast = this.toastCtrl.create({
            message: 'Conectado a Facebook con exito',
            duration: 3000
          });
          toast.present();
          this.navCtrl.setRoot(HomePage);
        }).catch((error) => {
          const toast = this.toastCtrl.create({
            message: 'Error al ingresar con Facebook',
            duration: 3000
          });
          toast.present();
          console.log(error);
        });
      } else {
        const toast = this.toastCtrl.create({
          message: 'Facebook login exitoso',
          duration: 3000
        });
        toast.present();
        this.navCtrl.setRoot(HomePage);
      }
    }).catch((error) => {
      const toast = this.toastCtrl.create({
        message: 'Error al ingresar con Facebook',
        duration: 3000
      });
      toast.present();
      console.log(error);
    });
  }

  test(): Promise<any> {
    return this.fb.login(['email'])
    .then((res) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(res.authResponse.accessToken);
        this.afAuth.auth.signInWithCredential(facebookCredential)
        .then((success) => {
          const toast = this.toastCtrl.create({
            message: success.displayName,
            duration: 3000
          });
          toast.present
          this.navCtrl.setRoot(HomePage);
        });
    }).catch((err) => {
      const toast = this.toastCtrl.create({
        message: 'Error al ingresar con Facebook',
        duration: 3000
      });
      toast.present();
    });  
  }

  google(): void {
    this.authService.google().subscribe((data) => {
      const user: any = {
        nombre : data.user.displayName,
        correo: data.user.email,
        uid: data.user.uid
      }
      if(data.additionalUserInfo.isNewUser) {
        this.userService.createUser(user).then((data) => {
          const toast = this.toastCtrl.create({
            message: 'Conectado a Google con exito',
            duration: 3000
          });
          toast.present();
          this.navCtrl.setRoot(HomePage);
        }).catch((error) => {
          const toast = this.toastCtrl.create({
            message: error,
            duration: 3000
          });
          toast.present();
          console.log(error);
        });
      } else {
        const toast = this.toastCtrl.create({
          message: 'Google login exitoso',
          duration: 3000
        });
        toast.present();
        this.navCtrl.setRoot(HomePage);
      }
    }, (error) => {
      const toast = this.toastCtrl.create({
        message: error,
        duration: 3000
      });
      toast.present();
      console.log(error);
    });
  }

  back() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
