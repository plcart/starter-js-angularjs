angular.module('StarterAngular')
    .factory('PageTitleService', ['urlBase', '$resource', function (urlBase, $resource) {
        return $resource(urlBase + 'pages/:page', { page:'@id', items: '10' });
    }]);