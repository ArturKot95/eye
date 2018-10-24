const app = angular.module("app", ["ngAnimate"]);

app.value("numberOutElement", $(".gameBox"));

app.factory("numbers", function () {
  function initializeNumbers() {
    let numbers = [];
    for (let numberLength = 3; numberLength < 6; numberLength++) {
      for (let numberIndex = 0; numberIndex < 15; numberIndex++) {
        let number = 1;
        for (let i = 0; i < numberLength; i++) {
          number *= 10;
        }
        number = Math.random() * ((number * 10) - number) + number;
        numbers.push(Math.floor(number));
      }
    }
    return numbers;
  }

  return {
    numbers: initializeNumbers(),
    index: 0,
    restart: function () {
      this.index = 0;
      this.numbers = initializeNumbers();
    },
    getNext: function () {
      let number = this.numbers[this.index];

      if (number) {
        this.index++;
        return number;
      } else {
        return null;
      }
    }
  }
});

app.controller("bodyCtrl", function ($scope, numbers, numberOutElement) {
  $scope.playing = false;
  $scope.type = false;
  $scope.numbersOut = [];
  $scope.numbersIn = [];
  // How many numbers were typed incorrectly
  $scope.wrongCount = 0;

  function displayNextNumber () {
    let nextNumber = numbers.getNext();
    if (nextNumber === null) {
      $scope.playing = false;
    } else {
      $scope.numberOut = nextNumber;
      $scope.type = false;
      setTimeout(function () {
        $scope.$apply("type = true");
        $(".numberInput").focus();
      }, 200);
    }
  }

  $scope.check = function (event) {
    // 13 is Enter
    if (event.keyCode === 13 || event.keyCode === 32) {
      if ($scope.numberOut == $scope.numberIn) {
        numberOutElement.removeClass("good").addClass("good");
        setTimeout(function () {
          numberOutElement.removeClass("good");
        }, 300);
      } else {
        $scope.wrongCount++;
        numberOutElement.removeClass("wrong").addClass("wrong");
        setTimeout(function () {
          numberOutElement.removeClass("wrong");
        }, 300);
      }

      $scope.numbersIn.push($scope.numberIn);
      $scope.numberIn = "";
      displayNextNumber();
    }
  };

  $scope.play = function () {
    $scope.wrongCount = 0;
    $scope.playing = true;
    numbers.restart();
    $scope.numbersOut = numbers.numbers;
    $scope.numbersIn = [];
    displayNextNumber();
  };

  $scope.$watch("type", function (newVal, oldVal) {
    if (newVal === true) {
      $(".numberOut").hide(0, function () {
        $(".numberInput").show(0);
      });
    } else {
      $(".numberInput").hide(0, function () {
        $(".numberOut").show(0);
      });
    }
  });
});
