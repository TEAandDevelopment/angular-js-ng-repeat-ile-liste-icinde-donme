var app = angular.module("teaApp", []);

app.controller("teaCntrl", function ($scope) {
    $scope.Messages = [];
    $scope.NewMessage = "";
    $scope.addMessage = function () {
        $scope.Messages.push($scope.NewMessage);
        $scope.NewMessage = "";
    };
    $scope.removeMessage = function (Index) {
        $scope.Messages.splice(Index, 1);
    };
});
