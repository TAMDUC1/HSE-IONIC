// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    firebase: {
        apiKey: "AIzaSyA9cQc7SoyUwq-uKpbH1MP4js4i65cs3Qw",
        authDomain: "ionic-pwa-3d3c9.firebaseapp.com",
        databaseURL: "https://ionic-pwa-3d3c9.firebaseio.com/",
        projectId: "ionic-pwa-3d3c9",
        storageBucket: "gs://ionic-pwa-3d3c9.appspot.com/",
        messagingSenderId: "352809123105",
        appId: "1:352809123105:web:82aad4a801da11154f9260"
    },
    url: 'http://222.255.252.41',
    apiPost : 'http://222.255.252.41/api/Posts' ,
    apiAudit : 'http://222.255.252.41/api/HseAudits/',
    upload: 'http://222.255.252.41/content/uploads/',
    coreFileUpload: 'http://222.255.252.41/api/CoreFileUploads/',
    docUpload: 'http://222.255.252.41/api/DocumentsUpload/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
