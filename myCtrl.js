var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  $scope.filmsMenuOpen = false;
  $scope.film = {};

    $scope.toggleFilms = function(page) {
        $scope.filmsMenuOpen = !$scope.filmsMenuOpen;
    };

    $scope.getFilms = function(film)
    {
        setPage('films')

        $http({
            method: 'GET',
            url: 'https://swapi.dev/api/films/' + film + '/'
          }).then(function successCallback(response) {
              $scope.film.title = response.data.title;
              $scope.film.releaseDateFilm = response.data.release_date;
              $scope.film.director = response.data.director;

              $scope.film.characters = [];

              for(var i = 0;i < response.data.characters.length ; i++)
              {
                    getCharacter(response.data.characters[i]);
              }


            }, function errorCallback(response) {
                
            });
    }

    $scope.getPlanets = function()
    {
        setPage('planet')

        $scope.planets = [];

        $http({
            method: 'GET',
            url: 'https://swapi.dev/api/planets'
        }).then(function successCallback(response) {
             
            for(var i = 0;i < response.data.results.length ; i++)
            {
                var planet = {};

                planet.name = response.data.results[i].name;
                planet.rotationPeriod = response.data.results[i].rotation_period;
                planet.orbitalPeriod = response.data.results[i].orbital_period;
                planet.diameter = response.data.results[i].diameter;
                planet.climate = response.data.results[i].climate;

                $scope.planets.push(planet);
            }

            if(response.data.next)
            {
                getNextPlanets(response.data.next);
            }

        }, function errorCallback(response) {
                
        });
    }

    $scope.getStarSchips = function()
    {
        setPage('starSchips')

        $scope.starSchips = {};
        $scope.starSchips.ships = [];

        $http({
            method: 'GET',
            url: 'https://swapi.dev/api/starships'
        }).then(function successCallback(response) {
             
            $scope.starSchips.next = response.data.next;
            $scope.starSchips.previous = response.data.previous;

            for(var i = 0;i < response.data.results.length ; i++)
            {
                var schip = {};

                schip.name = response.data.results[i].name;
                schip.model = response.data.results[i].model;
                schip.cost = response.data.results[i].cost_in_credits;
                schip.passengers = response.data.results[i].passengers;
                schip.crew = response.data.results[i].crew;

                $scope.starSchips.ships.push(schip);
            }

        }, function errorCallback(response) {
                
        });
    }

    $scope.getStarSchipsPage = function(page)
    {
        $scope.starSchips = {};
        $scope.starSchips.ships = [];

        $http({
            method: 'GET',
            url: page
        }).then(function successCallback(response) {
             
            $scope.starSchips.next = response.data.next;
            $scope.starSchips.previous = response.data.previous;

            for(var i = 0;i < response.data.results.length ; i++)
            {
                var schip = {};

                schip.name = response.data.results[i].name;
                schip.model = response.data.results[i].model;
                schip.cost = response.data.results[i].cost_in_credits;
                schip.passengers = response.data.results[i].passengers;
                schip.crew = response.data.results[i].crew;

                $scope.starSchips.ships.push(schip);
            }

        }, function errorCallback(response) {
                
        });
    }

    getNextPlanets = function(apiUrlNextPlanets)
    {
        $http({
            method: 'GET',
            url: apiUrlNextPlanets
        }).then(function successCallback(response){
            for(var i = 0;i < response.data.results.length ; i++)
            {
                var planet = {};

                planet.name = response.data.results[i].name;
                planet.rotationPeriod = response.data.results[i].rotation_period;
                planet.orbitalPeriod = response.data.results[i].orbital_period;
                planet.diameter = response.data.results[i].diameter;
                planet.climate = response.data.results[i].climate;

                $scope.planets.push(planet);
            }

            if(response.data.next)
            {
                getNextPlanets(response.data.next);
            }
            
        }, function errorCallback(response){

        });
    }

    getCharacter = function(apiUrlCharacter)
    {
        $http({
            method: 'GET',
            url: apiUrlCharacter
        }).then(function successCallback(response){
            var character = {};

            character.name = response.data.name;
            character.length = response.data.height;
            character.gender = response.data.gender;
            character.countFilms = response.data.films.length;

            $scope.film.characters.push(character);
            
        }, function errorCallback(response){

        });
    }

    setPage = function(page)
    {
        $scope.filmsPage = false;
        $scope.planetPage = false;
        $scope.starSchipsPage = false;

        switch(page) {
            case 'films':
              $scope.filmsPage = true;
              break;
            case 'planet':
              $scope.planetPage = true;
              break;
            case 'starSchips':
              $scope.starSchipsPage = true;
              break;
            case 'none':
                break;
            default:
              // code block
          }
    }

    
  setPage('none');
});