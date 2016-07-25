angular.module('StarterAngular')
    .factory("ContentNegotiationFactory", ['formatters', function (formatters) {
        return {
            build: function (params) {
                var result = {};
                for (var i = 0; i < formatters.length; i++) {
                    result[formatters[i].method] = {
                        method: "GET",
                        params: params,
                        headers: {
                            'Accept': formatters[i].accept,
                            'If-None-Match': null
                        },
                        interceptor: {
                            'response': function (response) {
                                var result = 'data:' + response.headers()["content-type"] + ';base64,' + encodeURIComponent(response.data);
                                window.open(result, "");
                                return response;
                            }
                        }
                    }
                }
                return result;
            }
        }
    }]);