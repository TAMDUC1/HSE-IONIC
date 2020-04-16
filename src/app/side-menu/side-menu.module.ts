import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SideMenuPage } from './side-menu.page';
import { UserGuard } from '../services/user.guard';
import {AuthGuardService} from '../services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    component: SideMenuPage,
    children: [
      //************ Auth  ***********//
      {
        path: 'login',
        loadChildren: '../app-auth/login/login.module#LoginPageModule'
      },
      {
          path: 'login-jwt',
          loadChildren: '../app-auth/login-jwt/login-jwt.module#LoginJwtPageModule'
      },

        {
        path: 'register',
        loadChildren: '../app-auth/register/register.module#RegisterPageModule'
      },
      {
        path: 'profile',
        loadChildren: '../app-auth/profile/profile.module#ProfilePageModule',
        //canActivate: [UserGuard],
        canActivate: [AuthGuardService]

      },
      {
        path: 'forgot',
        loadChildren: '../app-auth/forgot/forgot.module#ForgotPageModule'
      },

      //************ APPS ***********/
      {
        path: 'audit',
        loadChildren: '../app-audit/audit-tabs/audit-tabs.module#AuditTabsPageModule',
      //  canActivate: [UserGuard]
          canActivate: [AuthGuardService]

      },
      {
          path: 'auditkt',
          loadChildren: '../app-audit/auditkt-home/auditkt-home.module#AuditktHomePageModule',
          //  canActivate: [UserGuard]
          canActivate: [AuthGuardService]

      },
      {
        path: 'keywords',
        loadChildren: '../app-hse-keywords/keywords-home/keywords-home.module#KeywordsHomePageModule',
      //  canActivate: [UserGuard]
          canActivate: [AuthGuardService]

      },
      {
        path: 'news',
        loadChildren: '../app-news/news-home/news-home.module#NewsHomePageModule'

      },  /*,
      {
        path: 'travel',
        loadChildren: '../app-travel/travel-tabs/travel-tabs.module#TravelTabsPageModule'
      },
      {
        path: 'food',
        loadChildren: '../app-food/food-tabs/food-tabs.module#FoodTabsPageModule'
      },
      {
        path: 'shopping',
        loadChildren: '../app-shopping/shopping-tabs/shopping-tabs.module#ShoppingTabsPageModule'
      },
      {
        path: 'realestate',
        loadChildren: '../app-real/real-tabs/real-tabs.module#RealTabsPageModule'
      },
      {
        path: 'radio',
        loadChildren: '../app-radio/radio-home/radio-home.module#RadioHomePageModule'
      },
      //!************ UI layout ***********!/
      {
        path: 'chat',
        loadChildren: '../ui-layouts/chat/chat.module#ChatPageModule'
      },
      {
        path: 'gallery',
        loadChildren: '../ui-layouts/gallery/gallery.module#GalleryPageModule'
      },
      {
        path: 'feed',
        loadChildren: '../ui-layouts/feed/feed.module#FeedPageModule'
      },*/
      // {
      //   path: 'form',
      //   loadChildren: '../ui-layouts/form/form.module#FormPageModule'
      // },
      // {
      //   path: 'intro',
      //   loadChildren: '../ui-layouts/intro/intro.module#IntroPageModule'
      // },
     /* {
        path: 'masonry',
        loadChildren: '../ui-layouts/masonry/masonry.module#MasonryPageModule'
      },
      {
        path: 'profile1',
        loadChildren: '../ui-layouts/profile1/profile1.module#Profile1PageModule'
      },
      {
        path: 'profile2',
        loadChildren: '../ui-layouts/profile2/profile2.module#Profile2PageModule'
      },*/
      // {
      //   path: 'profile3',
      //   loadChildren: '../ui-layouts/gallery/gallery.module#GalleryPageModule'
      // },
      // {
      //   path: 'profile4',
      //   loadChildren: '../ui-layouts/gallery/gallery.module#GalleryPageModule'
      // },
     /* {
        path: 'timeline',
        loadChildren: '../ui-layouts/timeline/timeline.module#TimelinePageModule'
      },*/
      
      //************ UI components ***********/
      /*{
        path: 'animation',
        loadChildren: '../ui-components/animation/animation.module#AnimationPageModule'
      },  
      {
        path: 'header-fading',
        loadChildren: '../ui-components/header-fading/header-fading.module#HeaderFadingPageModule'
      },
      {
        path: 'header-hide-title',
        loadChildren: '../ui-components/header-hide-title/header-hide-title.module#HeaderHideTitlePageModule'
      },
      {
        path: 'header-shrinking',
        loadChildren: '../ui-components/header-shrinking/header-shrinking.module#HeaderShrinkingPageModule'
      },
      {
        path: 'header-footer-shrinking',
        loadChildren: '../ui-components/header-footer-shrinking/header-footer-shrinking.module#HeaderFooterShrinkingPageModule'
      },
      {
        path: 'header-transparent',
        loadChildren: '../ui-components/header-transparent/header-transparent.module#HeaderTransparentPageModule'
      },
      {
        path: 'footer-shrinking',
        loadChildren: '../ui-components/footer-shrinking/footer-shrinking.module#FooterShrinkingPageModule'
      },
      {
        path: 'rating',
        loadChildren: '../ui-components/rating/rating.module#RatingPageModule'
      },
      {
        path: 'modal',
        loadChildren: '../ui-components/modal/modal.module#ModalPageModule'
      },
      {
        path: 'skeleton',
        loadChildren: '../ui-components/skeleton/skeleton.module#SkeletonPageModule'
      },*/
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SideMenuPage]
})
export class SideMenuPageModule {}
