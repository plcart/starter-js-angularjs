angular.module('StarterAngular')
    .factory('PageHighlightService', ['urlBase', '$resource', 'ContentNegotiationFactory', function (urlBase, $resource, content) {
        return $resource(urlBase + 'pages/:page/:language/highlights/:id', { id: '@Id',  page: '@Page.Page', language: "@Page.Language", items: 10 },
            angular.extend(content.build({ page: '@Page.Page', language: "@Page.Language", items: null }),
                {
                    'update': { method: "PUT", params: { id: '@Id', page: '@Page.Page', language: "@Page.Language", items: null } },
                    'destroy': { method: "DELETE", params: { id: '@Id', page: '@Page.Page', language: "@Page.Language", items: null } },
                    'query': {
                        method: "GET", params: { id: '@Id', page: '@Page.Page', language: "@Page.Language", items: 10 }, isArray: true,
                        transformResponse: function (data, headers) {
                            var response = JSON.parse(data);
                            if (response.length)
                                response[0].$count = headers()["x-total"];
                            return response;
                        }
                    }
                }));
    }]);