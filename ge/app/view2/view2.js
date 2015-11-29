'use strict';
angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$window', function($scope, $window) {
  $scope.currentStep = 0;
  $scope.hideReadyBtn = false;
  $scope.done = false;
  var steps = [];

  $scope.speech = function() {
    $scope.hideReadyBtn = true;

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
        $scope.currentStep += 1;
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

  var times = 0;
  setInterval(function() {
    if (times <= 5) {
      times++;

    } else {


      switch ($window.shake) {
        case 1:
              console.log('prompt');
              prompt();
              break;
        //case 2:
        //    console.log('skip');
        //      skip();
        //      break;
        //case 3:
        //      repeat();
        //    console.log('repeat');
        //      break;
      }


      $window.shake = 0;
      times = 0;
    }

  }, 100);

  function prompt() {
    var voices = window.speechSynthesis.getVoices();
    var utterance = new SpeechSynthesisUtterance(steps[$scope.currentStep]);

    $scope.$apply(function() {
      $scope.currentStep += 1;
    });
    utterance.voice = voices[2];
    window.speechSynthesis.speak(utterance);

    console.log($scope.currentStep);
    if ($scope.currentStep == 5) {

      $scope.$apply(function() {
        $scope.done = true;
      });
    }
    console.log($scope.done);

  }

      function repeat() {
        //var voices = window.speechSynthesis.getVoices();
        //var utterance = new SpeechSynthesisUtterance('repeat');
        //utterance.voice = voices[2];
        //window.speechSynthesis.speak(utterance);
        //
        //voices = window.speechSynthesis.getVoices();
        //utterance = new SpeechSynthesisUtterance(steps[$scope.currentStep - 1]);
        //utterance.voice = voices[2];
        //window.speechSynthesis.speak(utterance);

        sayThings(['repeat', steps[$scope.currentStep - 1]]);
      }

      function skip() {
        //var voices = window.speechSynthesis.getVoices();
        //var utterance = new SpeechSynthesisUtterance('skip');
        //utterance.voice = voices[2];
        //window.speechSynthesis.speak(utterance);
        //
        //
        //voices = window.speechSynthesis.getVoices();
        //$scope.currentStep += 1;
        //utterance = new SpeechSynthesisUtterance(steps[$scope.currentStep]);
        //utterance.voice = voices[2];
        //window.speechSynthesis.speak(utterance);


        sayThings(['skip', steps[$scope.currentStep + 1]]);
        $scope.currentStep += 2;
      }


      function sayThings(arrayOfThingsToSay) {
        var voices = window.speechSynthesis.getVoices();
        //var flag = true;
        for (var i = 0; i < arrayOfThingsToSay.length; i++) {
          var utterance = new SpeechSynthesisUtterance(arrayOfThingsToSay[i]);
          utterance.voice = voices[2];
          console.log('spoke');
          window.speechSynthesis.speak(utterance);
        }


        //window.speechSynthesis.getVoices();

        //window.speechSynthesis.onvoiceschanged = function() {
        //  if (flag) {
        //    var voices = window.speechSynthesis.getVoices();
            //
            //for (var i = 0; i < arrayOfThingsToSay.length; i++) {
            //  var utterance = new SpeechSynthesisUtterance(arrayOfThingsToSay[i]);
            //  utterance.voice = voices[2];
            //  window.speechSynthesis.speak(utterance);
            //}
            //
            //
            //flag = false;
          //}
        //}
      }

}]);

