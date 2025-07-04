import { Component, linkedSignal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { showAccountModalSignal, showCartModalSignal, showContactModalSignal, showLoginModalSignal } from './modal.state';
import { Login } from './modals/login/login';
import { Cart } from "./modals/cart/cart";
import { Account } from "./modals/account/account";
import { Contact } from "./modals/contact/contact";
import { accessTokenSignal } from './access-token-signal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Cart, Account, Contact, RouterLink],
  templateUrl: './app.html'
})
export class App {
  protected title = 'ECommerceClientUI';
  showLogin=showLoginModalSignal;
  showCart=showCartModalSignal;
  showAccount=showAccountModalSignal;
  showContact=showContactModalSignal;
  isLoggedIn = linkedSignal(()=>accessTokenSignal()!==null);
  openLoginModal(){
    this.showLogin.set(true);
  }
  openCartModal(){
    this.showCart.set(true);
  }
  openAccountModal(){
    this.showAccount.set(true);
  }
  openContactModal(){
    this.showContact.set(true);
  }
  logout(){
    sessionStorage.removeItem("accessToken");
    this.isLoggedIn.set(false);
    window.location.reload();
  }
}
