<?php

use src\Finger;
use src\Lutsevich;
use src\Hui;

require 'vendor/autoload.php';

$params = parse_url($_SERVER['REQUEST_URI']);
$uri = $params['path'];
$uriParts = explode('/', $uri);
$action = $uriParts[2];
if (empty($action)) {
    echo json_encode(['data' => 'gde action ska?']);
} else {
    echo json_encode(['data' => $action()]);
}

function finger() {
    $sanya = new Lutsevich();
    $finger = new Finger();
    return $sanya->putInAss($finger);
}

function hui() {
    $sanya = new Lutsevich();
    $xui = new Hui();
    return $sanya->putInAss($xui);
}

function gay() {
    $sanya = new Lutsevich();
    return $sanya->sayMyName();
}

