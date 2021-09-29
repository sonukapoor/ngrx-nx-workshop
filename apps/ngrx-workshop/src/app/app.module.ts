import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule } from './router/routing.module';
import { CartIconModule } from './cart/cart-icon/cart-icon.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './product/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools' ;

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RoutingModule,
    CartIconModule,
    MatToolbarModule,
    StoreModule.forRoot({product: productsReducer}),
    StoreDevtoolsModule.instrument({maxAge: 50})
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
