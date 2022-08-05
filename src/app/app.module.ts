import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

// Pages
import { LoginComponent } from './pages/login/login.component';
import { NewsFeedComponent } from './pages/news-feed/news-feed.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { UserFollowersPageComponent } from './pages/user-followers-page/user-followers-page.component';
import { UserFollowingPageComponent } from './pages/user-following-page/user-following-page.component';
import { DeleteUserPageComponent } from './pages/delete-user-page/delete-user-page.component';

// Components
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingComponent } from './components/loading/loading.component';

import { AppComponent } from './app.component';
import { SearchForUserPageComponent } from './pages/search-for-user-page/search-for-user-page.component';

const routes: Routes = [
  { path: 'feed', component: NewsFeedComponent },
  { path: 'search-for-users', component: SearchForUserPageComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: LandingPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'u/:id', component: UserPageComponent },
  { path: 'u/:id/edit', component: EditUserPageComponent }, // TODO
  { path: 'u/:id/followers', component: UserFollowersPageComponent },
  { path: 'u/:id/following', component: UserFollowingPageComponent },
  { path: 'u/:id/delete', component: DeleteUserPageComponent }, // TODO
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
    PostPageComponent,
    EditUserPageComponent,
    UserFollowersPageComponent,
    UserFollowingPageComponent,
    DeleteUserPageComponent,
    SearchForUserPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
