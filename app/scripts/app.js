'use strict';

/*jshint unused: false*/
/*jshint bitwise: false*/
(function() {

  var app = angular.module('upsConsole', [
    'ngResource',
    'ngNewRouter',
    'ngAnimate',
    'ngIdle',
    'ui.bootstrap',
    'patternfly.autofocus',
    'patternfly.notification',
    'patternfly.select',
    'angular-c3'
  ]);

  app.run(function($rootScope) {
    // allow to retrieve $rootScope in views (for clarification of access scope)
    $rootScope.$rootScope = $rootScope;
  });

  var appConfig = {
    logDebugEnabled: false,
    idleDuration: 300,
    idleWarningDuration : 30,
    keepaliveInterval: 5
  };

  app.provider('appConfig', function () {
    return {
      set: function (settings) {
        // allow to override configuration (e.g. in tests)
        angular.extend(appConfig, settings);
      },
      $get: function () {
        // default configuration
        return appConfig;
      }
    };
  });

  app.config(function ($logProvider, appConfigProvider) {
    var appConfig = appConfigProvider.$get();
    $logProvider.debugEnabled( appConfig.logDebugEnabled );
  });

  app.factory('docsLinks', function( $http, staticResourcePrefix ) {
    var result = {};
    $http.get( staticResourcePrefix + 'docs-links.json' )
      .then(function( response ) {
        angular.extend( result, response.data );
      });
    return result;
  });

  app.config(function() {
    
  });

  app.value('apiPrefix', '');

  app.value('staticResourcePrefix', '');

  app.constant('allVariantTypes', ['web_push', 'android', 'ios', 'ios_token']);

  app.value('allowCreateVariant', function( app, variantType, ui_config ) {
    console.log(ui_config);
    return true;
  });

})();
