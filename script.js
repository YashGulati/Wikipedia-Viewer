var input;
var dataFlag = 0;
angular.module("Yapp", [])
.controller("Ycontroller", function($scope, $http){
  $scope.submitted = function() {
      $scope.output = [];
      input = document.getElementById("search").value;
      var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + input + '&callback=JSON_CALLBACK';
      $http.jsonp(url)
      .success(function(data) {
      var output = data.query.pages;
      angular.forEach(output, function(v,k)  {
        $scope.output.push({title: v.title, body: v.extract, link: 'https://en.wikipedia.org/?curid=' + v.pageid})
      });

    });
  }

});

$('#search').change(function() {
  var a = document.getElementById("search").value;
  if(a != "" && dataFlag !== 0) $('.container').css("margin", "40px");
  if(a === "") $('.container').css("margin", "150px");
});

$('#search').focusout(function(event) {
  var a = document.getElementById("search").value;
  if(a == "" && output == "") $('.container').css("margin", "150px");
});
