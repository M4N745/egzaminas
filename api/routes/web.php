<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('/createRequest', 'AuthController@createRequest');
$router->get('/getAll', 'AuthController@getAll');
$router->get('/getRequest/{id}', 'AuthController@getRequest');
$router->put('/updateRequest/{id}', 'AuthController@updateRequest');
$router->post('/login', 'AuthController@login');
$router->post('/logout', 'AuthController@logout');
$router->post('/user-profile', 'AuthController@me');
