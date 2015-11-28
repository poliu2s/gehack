'use strict';
angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {
  $scope.currentStep = 0;


  $scope.speech = function() {
    var steps = [];

    steps[0] = 'Step One. Find a G.E. waterbottle.';
    steps[1] = 'Step Two. Pick up waterbottle.';
    steps[3] = 'Step Three. Open cap';
    steps[4] = 'Step Four. Change filter';
    steps[5] = 'You have completed the task. Good work.';

    window.speechSynthesis.getVoices();
    var flag = true;

    window.speechSynthesis.onvoiceschanged = function() {
      if (flag) {

        var voices = window.speechSynthesis.getVoices();
        var utterance = new SpeechSynthesisUtterance(steps[$scope.currentStep]);
        utterance.voice = voices[2];
        window.speechSynthesis.speak(utterance);


        //for (var i = 0; i < steps.length; i++) {
        //  var utterance = new SpeechSynthesisUtterance(steps[i]);
        //  utterance.voice = voices[2];
        //  window.speechSynthesis.speak(utterance);
        //}

        flag = false;
      }
    };

  };

  $scope.$watch('window.shake', function() {
    if (window.shake) {
      var voices = window.speechSynthesis.getVoices();
      var utterance = new SpeechSynthesisUtterance(steps[$scope.currentStep]);
      utterance.voice = voices[2];
      window.speechSynthesis.speak(utterance);

    }
  });


}]);

