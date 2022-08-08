import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

// Components
import { UserPostComponent } from './components/user-post/user-post.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

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
import { SearchForUserPageComponent } from './pages/search-for-user-page/search-for-user-page.component';
import { EditPostPageComponent } from './pages/edit-post-page/edit-post-page.component';
import { DeletePostPageComponent } from './pages/delete-post-page/delete-post-page.component';
import { MuteUserPageComponent } from './pages/mute-user-page/mute-user-page.component';
import { BanUserPageComponent } from './pages/ban-user-page/ban-user-page.component';
import { PromoteUserPageComponent } from './pages/promote-user-page/promote-user-page.component';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'feed', redirectTo: '/feed/1', pathMatch: 'full' },
  { path: 'feed/:page', component: NewsFeedComponent },
  { path: 'search-for-users', component: SearchForUserPageComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: LandingPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'u/:id', component: UserPageComponent },
  { path: 'u/:id/edit', component: EditUserPageComponent }, // TODO
  { path: 'u/:id/mute', component: MuteUserPageComponent },
  { path: 'u/:id/ban', component: BanUserPageComponent },
  { path: 'u/:id/promote', component: PromoteUserPageComponent },
  { path: 'u/:id/delete', component: DeleteUserPageComponent },
  { path: 'u/:id/followers', component: UserFollowersPageComponent },
  { path: 'u/:id/following', component: UserFollowingPageComponent },
  { path: 'post/:id', component: PostPageComponent },
  { path: 'post/:id/edit', component: EditPostPageComponent },
  { path: 'post/:id/delete', component: DeletePostPageComponent },
  { path: 'comment/:id/edit', component: EditPostPageComponent }, // TODO
  { path: 'comment/:id/delete', component: DeletePostPageComponent },
  { path: '404', component: ErrorPageComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    NewsFeedComponent,
    LandingPageComponent,
    ErrorPageComponent,
    UserPostComponent,
    UserPageComponent,
    CreatePostComponent,
    LoadingComponent,
    PostPageComponent,
    EditUserPageComponent,
    UserFollowersPageComponent,
    UserFollowingPageComponent,
    DeleteUserPageComponent,
    SearchForUserPageComponent,
    EditPostPageComponent,
    DeletePostPageComponent,
    MuteUserPageComponent,
    BanUserPageComponent,
    PromoteUserPageComponent
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
