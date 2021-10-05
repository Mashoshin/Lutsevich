<?php

use src\Finger;
use src\Lutsevich;
use src\Hui;

require 'vendor/autoload.php';

$params = parse_url($_SERVER['REQUEST_URI']);
$uri = $params['path'];
$uriParts = explode('/', $uri);
$action = $uriParts[1];
if (empty($action)) {
    echo render('privetik');
} else {
    echo $action();
}

function finger() {
    $sanya = new Lutsevich();
    $finger = new Finger();
    return render($sanya->putInAss($finger));
}

function hui() {
    $sanya = new Lutsevich();
    $xui = new Hui();
    return render($sanya->putInAss($xui));
}

function render($answer)
{
    ob_start();
    ob_implicit_flush(false);

    $viewFile = getViewFile('main');
    require $viewFile;

    return ob_get_clean();
}

function getViewFile(string $view)
{
    $file = 'view' . '/' . "$view.php";
    if (!is_file($file)) {
        throw new Exception('View file does not exist.');
    }

    return $file;
}
