<?php

return [

    /*
    |--------------------------------------------------------------------------
    | View Storage Paths
    |--------------------------------------------------------------------------
    |
    | Most templating systems load templates from disk. Here you may specify
    | an array of paths that should be checked for your views. Of course
    | the usual Laravel view path has already been registered for you.
    |
    */

    'paths' => [
        resource_path('views'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Compiled View Path
    |--------------------------------------------------------------------------
    |
    | This option determines where all the compiled Blade templates will be
    | stored for your application. Typically, this is within the storage
    | directory. However, as usual, you are free to change this value.
    |
    */

    'compiled' => env(
        'VIEW_COMPILED_PATH',
        realpath(storage_path('framework/views'))
    ),

    /*
    |--------------------------------------------------------------------------
    | View Debug Mode
    |--------------------------------------------------------------------------
    |
    | When view debug mode is enabled, the compiled view that is dumped to
    | the browser will be automatically re-compiled when changes are made
    | to the view file. This is useful during development so that views
    | are automatically recompiled when changes are made to the views.
    |
    */

    'debug' => env('VIEW_DEBUG', false),

]; 