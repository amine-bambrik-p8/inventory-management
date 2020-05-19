import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-web-client';
  links_top = [
    { path: '/checkout', icon: 'shopping_cart', label: 'Checkout' },
    { path: '/products', icon: 'all_inbox', label: 'Inventory' },
    { path: '/orders', icon: 'unarchive', label: 'Orders' },
    { path: '/clients', icon: 'face', label: 'Clients' },
    { path: '/suppliers', icon: 'local_shipping', label: 'Suppliers' },
    //{ path: '/', icon: 'notification_important', label: 'Alerts' },
    { path: '/users', icon: 'account_circle', label: 'Users' },
    
  ];
  links_bottom = [
    { path: '/', icon: 'settings', label: 'Settings' },
    { path: '/', icon: 'feedback', label: 'Feedback' },
    { path: '/', icon: 'power_settings_new', label: 'Logout' },
  ]
  isSidenaveOpen(component, authentication) {
    return component.opened && authentication;
  }
}
