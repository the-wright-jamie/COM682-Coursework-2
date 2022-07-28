import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UserPostComponent } from './user-post/user-post.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { PostPageComponent } from './post-page/post-page.component';
const routes: Routes = [
  { path: 'feed', component: NewsFeedComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: LandingPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'u/:id', component: UserPageComponent },
  { path: 'post/:id', component: PostPageComponent },
  { path: '404', component: ErrorPageComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NewsFeedComponent,
    LandingPageComponent,
    ErrorPageComponent,
    UserPostComponent,
    UserPageComponent,
    CreatePostComponent,
    NavbarComponent,
    LoadingComponent,
    PostPageComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
