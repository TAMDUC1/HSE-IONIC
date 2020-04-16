import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
 // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },

  { path: '', redirectTo: 'side-menu/audit/tabs/tab1', pathMatch: 'full' },

  { path: 'side-menu', loadChildren: './side-menu/side-menu.module#SideMenuPageModule' },

  //**************************************//
  //********** Authentication ************//
  //**************************************//

  // { path: 'listitem', loadChildren: './templates/listitem/listitem.module#ListitemPageModule' },
  // { path: 'auth-main', loadChildren: './app-auth/auth-main/auth-main.module#AuthMainPageModule' },
  { path: 'login', loadChildren: './app-auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './app-auth/register/register.module#RegisterPageModule' },
  { path: 'forgot', loadChildren: './app-auth/forgot/forgot.module#ForgotPageModule' },
  { path: 'profile', loadChildren: './app-auth/profile/profile.module#ProfilePageModule' },
  { path: 'logout', loadChildren: './app-auth/logout/logout.module#LogoutPageModule' },



  //********************************************//
  //********** audit  app ************//
  //********************************************//
  { path: 'audit-home', loadChildren: './app-audit/audit-home/audit-home.module#AuditHomePageModule' },
  { path: 'audit-tabs', loadChildren: './app-audit/audit-tabs/audit-tabs.module#AuditTabsPageModule' },

  //***************************************//
  //********** Travel guide app ************//
  //****************************************//

/*
  { path: 'travel-home', loadChildren: './app-travel/travel-home/travel-home.module#TravelHomePageModule' },
  { path: 'travel-category', loadChildren: './app-travel/travel-category/travel-category.module#TravelCategoryPageModule' },
  { path: 'travel-recommended', loadChildren: './app-travel/travel-recommended/travel-recommended.module#TravelRecommendedPageModule' },
  // { path: 'travel-tags:tagId', loadChildren: './app-travel/travel-tags/travel-tags.module#TravelTagsPageModule' },
  { path: 'travel-place/:categoryId', loadChildren: './app-travel/travel-place/travel-place.module#TravelPlacePageModule' },
  { path: 'travel-place-review/:placeId', loadChildren: './app-travel/travel-place-review/travel-place-review.module#TravelPlaceReviewPageModule' },
  { path: 'travel-place-detail/:placeId', loadChildren: './app-travel/travel-place-detail/travel-place-detail.module#TravelPlaceDetailPageModule' },

 
  { path: 'travel-search', loadChildren: './app-travel/travel-search/travel-search.module#TravelSearchPageModule' },
  { path: 'travel-favorite', loadChildren: './app-travel/travel-favorite/travel-favorite.module#TravelFavoritePageModule' },

  
  { path: 'travel-image-zoom', loadChildren: './app-travel/travel-image-zoom/travel-image-zoom.module#TravelImageZoomPageModule' },
  //{ path: 'hide-show-header', loadChildren: './ui-components/hide-show-header/hide-show-header.module#HideShowHeaderPageModule' },

  { path: 'travel-tag/:tagId', loadChildren: './app-travel/travel-tag/travel-tag.module#TravelTagPageModule' },  
  { path: 'travel-profile', loadChildren: './app-travel/travel-profile/travel-profile.module#TravelProfilePageModule' },

  { path: 'travel-map-modal/:categoryId', loadChildren: './app-travel/travel-map-modal/travel-map-modal.module#TravelMapModalPageModule' },
  { path: 'travel-place-review-add/:placeId', loadChildren: './app-travel/travel-place-review-add/travel-place-review-add.module#TravelPlaceReviewAddPageModule' },
  */
  

  
  //***************************************//
  //********** Food delivery app ************//
  //***************************************//
 // { path: 'food-home', loadChildren: './app-food/food-home/food-home.module#FoodHomePageModule' },


 /* { path: 'food-tabs', loadChildren: './app-food/food-tabs/food-tabs.module#FoodTabsPageModule' },
  { path: 'food-category', loadChildren: './app-food/food-category/food-category.module#FoodCategoryPageModule' },
  { path: 'food-myorder', loadChildren: './app-food/food-myorder/food-myorder.module#FoodMyorderPageModule' },
  { path: 'food-address', loadChildren: './app-food/food-address/food-address.module#FoodAddressPageModule' },
  { path: 'food-payment/:addressId', loadChildren: './app-food/food-payment/food-payment.module#FoodPaymentPageModule' },
  { path: 'food-detail/:itemId', loadChildren: './app-food/food-detail/food-detail.module#FoodDetailPageModule' },
  { path: 'food-complete', loadChildren: './app-food/food-complete/food-complete.module#FoodCompletePageModule' },
  { path: 'food-cart', loadChildren: './app-food/food-cart/food-cart.module#FoodCartPageModule' },
  { path: 'food-address-add', loadChildren: './app-food/food-address-add/food-address-add.module#FoodAddressAddPageModule' },
  { path: 'food-address-edit/:addressId', loadChildren: './app-food/food-address-edit/food-address-edit.module#FoodAddressEditPageModule' },
  { path: 'food-summary/:addressId/:paymentType', loadChildren: './app-food/food-summary/food-summary.module#FoodSummaryPageModule' },
  { path: 'food-profile', loadChildren: './app-food/food-profile/food-profile.module#FoodProfilePageModule' },
*/
  //*************************************//
  //********** Shopping app ************//
  //************************************//


 /* { path: 'shopping-group', loadChildren: './app-shopping/shopping-group/shopping-group.module#ShoppingGroupPageModule' },
  { path: 'shopping-cart', loadChildren: './app-shopping/shopping-cart/shopping-cart.module#ShoppingCartPageModule' },
  
 
  { path: 'shopping-address', loadChildren: './app-shopping/shopping-address/shopping-address.module#ShoppingAddressPageModule' },
  { path: 'shopping-address-add', loadChildren: './app-shopping/shopping-address-add/shopping-address-add.module#ShoppingAddressAddPageModule' },
  { path: 'shopping-address-edit/:addressId', loadChildren: './app-shopping/shopping-address-edit/shopping-address-edit.module#ShoppingAddressEditPageModule' },
  { path: 'shopping-detail/:itemId', loadChildren: './app-shopping/shopping-detail/shopping-detail.module#ShoppingDetailPageModule' },
  */
  
 /* { path: 'shopping-payment/:addressId', loadChildren: './app-shopping/shopping-payment/shopping-payment.module#ShoppingPaymentPageModule' },
   /// ****** check this line ******!//
  { path: 'shopping-summary/:addressId/:paymentType', loadChildren: './app-shopping/shopping-summary/shopping-summary.module#ShoppingSummaryPageModule' },
  { path: 'shopping-finish', loadChildren: './app-shopping/shopping-finish/shopping-finish.module#ShoppingFinishPageModule' },
 
  { path: 'shopping-profile', loadChildren: './app-shopping/shopping-profile/shopping-profile.module#ShoppingProfilePageModule' },
*/
 // { path: 'shopping-review/:itemId', loadChildren: './app-shopping/shopping-review/shopping-review.module#ShoppingReviewPageModule' },
 // { path: 'shopping-review-add/:itemId', loadChildren: './app-shopping/shopping-review-add/shopping-review-add.module#ShoppingReviewAddPageModule' },
 // { path: 'shopping-image-gallery', loadChildren: './app-shopping/shopping-image-gallery/shopping-image-gallery.module#ShoppingImageGalleryPageModule' },
 
  
  
  
  //***************************************//
  //********** Real estate app ************//
  //***************************************//
/*
  { path: 'real-home', loadChildren: './app-real/real-home/real-home.module#RealHomePageModule' },
  { path: 'real-list', loadChildren: './app-real/real-list/real-list.module#RealListPageModule' },
  { path: 'real-detail/:itemId', loadChildren: './app-real/real-detail/real-detail.module#RealDetailPageModule' },
  { path: 'real-favorite', loadChildren: './app-real/real-favorite/real-favorite.module#RealFavoritePageModule' },
  { path: 'real-profile', loadChildren: './app-real/real-profile/real-profile.module#RealProfilePageModule' },
  { path: 'real-agent', loadChildren: './app-real/real-agent/real-agent.module#RealAgentPageModule' },
  { path: 'real-agent-detail', loadChildren: './app-real/real-agent-detail/real-agent-detail.module#RealAgentDetailPageModule' },
  //{ path: 'real-list-detail', loadChildren: './app-real/real-list-detail/real-list-detail.module#RealListDetailPageModule' },
  { path: 'real-search', loadChildren: './app-real/real-search/real-search.module#RealSearchPageModule' },
  { path: 'real-tabs', loadChildren: './app-real/real-tabs/real-tabs.module#RealTabsPageModule' },
  { path: 'real-map/:viewType', loadChildren: './app-real/real-map/real-map.module#RealMapPageModule' },
 // { path: 'real-map-modal', loadChildren: './app-real/real-map-modal/real-map-modal.module#RealMapModalPageModule' },
  { path: 'real-image-gallery', loadChildren: './app-real/real-image-gallery/real-image-gallery.module#RealImageGalleryPageModule' },
  */


  //********************************************//
  //********** Radio and music  app ************//
  //********************************************//
 /* { path: 'radio-home', loadChildren: './app-radio/radio-home/radio-home.module#RadioHomePageModule' },
                 
  { path: 'radio-player/:radioId', loadChildren: './app-radio/radio-player/radio-player.module#RadioPlayerPageModule' },
*/
    //********************************************//
    //********** audit  app ************//
    //********************************************//
  { path: 'audit-home', loadChildren: './app-audit/audit-home/audit-home.module#AuditHomePageModule' },
  { path: 'audit-tabs', loadChildren: './app-audit/audit-tabs/audit-tabs.module#AuditTabsPageModule' },
  { path: 'audit-detail/:uuid', loadChildren: './app-audit/audit-detail/audit-detail.module#AuditDetailPageModule' },


    //**************************//
  //******* Ui layout ********//
  //**************************//
 /* { path: 'gallery', loadChildren: './ui-layouts/gallery/gallery.module#GalleryPageModule' },
  { path: 'gallery-viewer-modal', loadChildren: './ui-layouts/gallery-viewer-modal/gallery-viewer-modal.module#GalleryViewerModalPageModule' },
  { path: 'masonry', loadChildren: './ui-layouts/masonry/masonry.module#MasonryPageModule' },
  { path: 'feed', loadChildren: './ui-layouts/feed/feed.module#FeedPageModule' },
  { path: 'timeline', loadChildren: './ui-layouts/timeline/timeline.module#TimelinePageModule' },
  { path: 'header-hide-title', loadChildren: './ui-components/header-hide-title/header-hide-title.module#HeaderHideTitlePageModule' },
  { path: 'skeleton', loadChildren: './ui-components/skeleton/skeleton.module#SkeletonPageModule' },
  { path: 'food-myorder-detail/:orderId', loadChildren: './app-food/food-myorder-detail/food-myorder-detail.module#FoodMyorderDetailPageModule' },
  { path: 'shopping-my-order-detail', loadChildren: './app-shopping/shopping-my-order-detail/shopping-my-order-detail.module#ShoppingMyOrderDetailPageModule' },
  
  { path: 'header-fading', loadChildren: './ui-components/header-fading/header-fading.module#HeaderFadingPageModule' },
  { path: 'header-transparent', loadChildren: './ui-components/header-transparent/header-transparent.module#HeaderTransparentPageModule' },
  { path: 'header-shrinking', loadChildren: './ui-components/header-shrinking/header-shrinking.module#HeaderShrinkingPageModule' },
  { path: 'animation', loadChildren: './ui-components/animation/animation.module#AnimationPageModule' },
  { path: 'rating', loadChildren: './ui-components/rating/rating.module#RatingPageModule' },
  { path: 'header-footer-shrinking', loadChildren: './ui-components/header-footer-shrinking/header-footer-shrinking.module#HeaderFooterShrinkingPageModule' },
  { path: 'footer-shrinking', loadChildren: './ui-components/footer-shrinking/footer-shrinking.module#FooterShrinkingPageModule' },

*/
  { path: 'modal', loadChildren: './ui-components/modal/modal.module#ModalPageModule' },
  { path: 'modal-detail', loadChildren: './ui-components/modal-detail/modal-detail.module#ModalDetailPageModule' },
  { path: 'audit-item-details', loadChildren: './app-audit/audit-item-details/audit-item-details.module#AuditItemDetailsPageModule' },
  { path: 'keywords-home', loadChildren: './app-hse-keywords/keywords-home/keywords-home.module#KeywordsHomePageModule' },
  { path: 'news-home', loadChildren: './app-news/news-home/news-home.module#NewsHomePageModule' },
  { path: 'login-jwt', loadChildren: './app-auth/login-jwt/login-jwt.module#LoginJwtPageModule' },
  { path: 'auditkt-home', loadChildren: './app-audit/auditkt-home/auditkt-home.module#AuditktHomePageModule' },




  //*************************************//
  //********** Ui components ************//
  //*************************************//
  // { path: 'accordion', loadChildren: './ui/accordion/accordion.module#AccordionPageModule' },
  // { path: 'card', loadChildren: './ui/card/card.module#CardPageModule' },
  // { path: 'list', loadChildren: './ui/list/list.module#ListPageModule' },
  // { path: 'horizontal', loadChildren: './ui-components/horizontal/horizontal.module#HorizontalPageModule' },
  // { path: 'fading-header', loadChildren: './ui-components/fading-header/fading-header.module#FadingHeaderPageModule' },
  // { path: 'transparent-header', loadChildren: './ui-components/transparent-header/transparent-header.module#TransparentHeaderPageModule' },
  // { path: 'animation', loadChildren: './ui/animation/animation.module#AnimationPageModule' },

 
  // { path: 'all', loadChildren: './ui-components/all/all.module#AllPageModule' },
  // { path: 'header-transparent', loadChildren: './ui/header-transparent/header-transparent.module#HeaderTransparentPageModule' },
  // { path: 'header-shrinking', loadChildren: './ui/header-shrinking/header-shrinking.module#HeaderShrinkingPageModule' },
  // { path: 'header-fading', loadChildren: './ui/header-fading/header-fading.module#HeaderFadingPageModule' },
  // { path: 'actionsheet', loadChildren: './ui/actionsheet/actionsheet.module#ActionsheetPageModule' },
  // { path: 'alert', loadChildren: './ui/alert/alert.module#AlertPageModule' },
  // { path: 'button', loadChildren: './ui/button/button.module#ButtonPageModule' },
  // { path: 'badge', loadChildren: './ui/badge/badge.module#BadgePageModule' },
  // { path: 'fab', loadChildren: './ui/fab/fab.module#FabPageModule' },
  // { path: 'datetime', loadChildren: './ui/datetime/datetime.module#DatetimePageModule' },
  // { path: 'grid', loadChildren: './ui/grid/grid.module#GridPageModule' },
  // { path: 'segment', loadChildren: './ui/segment/segment.module#SegmentPageModule' },
  // { path: 'horizontal', loadChildren: './ui/horizontal/horizontal.module#HorizontalPageModule' },
  // { path: 'rating', loadChildren: './ui/rating/rating.module#RatingPageModule' },
  // { path: 'toast', loadChildren: './ui/toast/toast.module#ToastPageModule' },
  // { path: 'modal', loadChildren: './ui/modal/modal.module#ModalPageModule' },

  // { path: 'ionic', loadChildren: './ionic/ionic.module#IonicPageModule' },
  // { path: 'profile1', loadChildren: './ui-layouts/profile1/profile1.module#Profile1PageModule' },
  
  // { path: 'profile2', loadChildren: './ui-layouts/profile2/profile2.module#Profile2PageModule' },
  // { path: 'profile3', loadChildren: './ui-layouts/profile3/profile3.module#Profile3PageModule' },
  // { path: 'profile4', loadChildren: './ui-layouts/profile4/profile4.module#Profile4PageModule' },
  // { path: 'chat', loadChildren: './ui-layouts/chat/chat.module#ChatPageModule' },

  //{ path: 'ionic-component', loadChildren: './services/ionic-component/ionic-component.module#IonicComponentPageModule' },

  // { path: 'travel-tag', loadChildren: './app-travel/travel-tag/travel-tag.module#TravelTagPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
