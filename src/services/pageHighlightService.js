angular.module('StarterAngular')
    .factory('PageHighlightService', ['urlBase', '$resource', function (urlBase, $resource) {
        return $resource(urlBase + 'pages/:page/highlights/:id', { page:'@page', items: '10' });
    }]);