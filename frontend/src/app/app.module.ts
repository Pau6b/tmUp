import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { Camera } from '@ionic-native/camera/ngx'
import { apiRestProvider } from '../providers/apiRest/apiRest';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Chooser } from '@ionic-native/chooser/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { NgCalendarModule  } from 'ionic2-calendar';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Connectivity } from '../providers/connectivity/connectivity-service';
import { googleMaps } from '../providers/googleMaps/google-maps';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';

import { AngularFirestore } from '@angular/fire/firestore';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,'/assets/translation/','.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgCalendarModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    Camera,
    File,
    Chooser,
    Geolocation,
    InAppBrowser,
    Network,
    Connectivity,
    googleMaps,
    AngularFirestore,
    ImagePicker,
    MediaCapture,
    File,
    PhotoViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    apiRestProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
