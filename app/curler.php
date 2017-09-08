<?php
header("Access-Control-Allow-Origin: http://*.alisongaleon.com/");
require '../vendor/autoload.php';

use \Curl\Curl;

$randomCH = "http://www.gocomics.com/random/calvinandhobbes/";

$curl = new Curl();
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->get($randomCH);

if ($curl->error) {
    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
} else {
    echo $curl->response;
}
?>