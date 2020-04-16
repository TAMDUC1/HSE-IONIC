
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {

  selectedPath = '';

  pages = [

    {
        title: 'Hệ thống kiểm tra',
        url: '/side-menu/audit',
        icon: ''
    },
      {
          title: 'Hệ thống kiểm toán',
          url: '/side-menu/auditkt',
          icon: ''
      },
    {
        title: 'Tin tức',
        url: '/side-menu/news',
        icon: ''
    },
    {
        title: 'Hệ thống từ khoá ',
        url: '/side-menu/keywords',
        icon: ''
    },
   /*,
    {
      title: 'City guide app',
      url: '/side-menu/travel',
      icon: ''
    },
    {
      title: 'Food delivery app',
      url: '/side-menu/food',
      icon: ''
    },
    {
      title: 'Shopping app',
      url: '/side-menu/shopping',
      icon: ''
    },
    {
      title: 'Real estate app',
      url: '/side-menu/realestate',
      icon: ''
    },
    {
      title: 'Radio station app',
      url: '/side-menu/radio',
      icon: ''
    },
   */

    //******************************//
    //********** Authentication*********//
    //******************************//
    {
      title: 'Xác thực',
      children: [
       /* {
          title: 'Đăng nhập',
          url: '/side-menu/login'
        },*/
        {
            title: 'Đăng nhập jwt',
            url: '/side-menu/login-jwt'
        },
       /* {
          title: 'Đăng ký',
          url: '/side-menu/register'
        },
        {
          title: 'Profile',
          url: '/side-menu/profile'
        },
        {
          title: 'Forgot',
          url: '/side-menu/forgot'
        },*/
      ]
    },
    //******************************//
    //********** ui layout *********//
    //******************************//
  /*  {
      title: 'UI layouts',
      children: [
        // {
        //   title: 'chart',
        //   url: '/side-menu/chart',
        //   icon: ''
        // },
        {
          title: 'chat',
          url: '/side-menu/chat',
          icon: ''
        },
        {
          title: 'feed',
          url: '/side-menu/feed',
          icon: ''
        },
        // {
        //   title: 'form',
        //   url: '/side-menu/form',
        //   icon: ''
        // },
        {
          title: 'gallery',
          url: '/side-menu/gallery',
          icon: ''
        },
        // {
        //   title: 'intro',
        //   url: '/side-menu/intro',
        //   icon: ''
        // },
        {
          title: 'profile1',
          url: '/side-menu/profile1',
          icon: ''
        },
        {
          title: 'profile2',
          url: '/side-menu/profile2',
          icon: ''
        },
        // {
        //   title: 'profile3',
        //   url: '/side-menu/profile3',
        //   icon: ''
        // },
        // {
        //   title: 'profile4',
        //   url: '/side-menu/profile4',
        //   icon: ''
        // },
        {
          title: 'masonry',
          url: '/side-menu/masonry',
          icon: ''
        },
        // {
        //   title: 'search',
        //   url: '/side-menu/search',
        //   icon: ''
        // },
        {
          title: 'timeline',
          url: '/side-menu/timeline',
          icon: ''
        }
      ]
    },*/
    //******************************//
    //********** UI components*********//
    //******************************//
   /* {
      title: 'UI components',
      children: [
        {
          title: 'animation',
          url: '/side-menu/animation'
        },
        {
          title: 'header-fading',
          url: '/side-menu/header-fading'
        },
        {
          title: 'header-hide-title',
          url: '/side-menu/header-hide-title'
        },
        {
          title: 'header-shrinking',
          url: '/side-menu/header-shrinking'
        },
        {
          title: 'header-footer-shrinking',
          url: '/side-menu/header-footer-shrinking'
        },
        {
          title: 'footer-shrinking',
          url: '/side-menu/footer-shrinking'
        },
        {
          title: 'header-transparent',
          url: '/side-menu/header-transparent'
        },
        {
          title: 'modal',
          url: '/side-menu/modal'
        },
        {
          title: 'rating',
          url: '/side-menu/rating'
        },
        {
          title: 'skeleton',
          url: '/side-menu/skeleton'
        },

        //!********** Core ionic components*********!//

        
      ]
    },*/
  ];
 
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }
 
  ngOnInit() {
 
  }
 
}