<?php

require 'vendor/autoload.php';

use Philo\Blade\Blade;

$templates = json_decode(file_get_contents('./templates.json'),true);
$views = __DIR__ . '/src/templates';
$cache = __DIR__ . '/cache';

$blade = new Blade($views, $cache);

 foreach($templates as $key => $val){
     $content = $blade->view()->make($key)->render();
    file_put_contents("./dist/{$val}.html",$content);

 }

