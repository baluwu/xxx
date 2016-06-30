require.config({
    baseUrl: '//120.24.5.57/js',
    paths: {
        'jquery': 'lib/jquery/3.0.0/jquery.min',
    }
});

if (!Function.prototype.bind) {
    require(['lib/es5-shim/4.0.3/es5-shim']);
}
