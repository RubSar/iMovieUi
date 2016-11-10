//init Most Popular Movie Characters App
(function(){
   angular.module('iMovieUiApp', ['uiModule','helperModule', 'satellizer'])
       .config(function($authProvider){
          $authProvider.facebook({
             clientId: '175488799579769'
          });

       });

})();