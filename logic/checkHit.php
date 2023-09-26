<?php

use JetBrains\PhpStorm\NoReturn;

session_start();

function checkHit($x, $y, $r): bool {
    if($x > 0) {
        if($y >= 0) {
            return $x <= $r and $y <= $r;
        } else {
            return false;
        }
    } else {
        if($y > 0) {
            return $y <= 2*$x + $r;
        } else {
            return $x*$x + $y*$y <= $r*$r;
        }
    }
}

function validate($x, $y, $r): bool {
    $correct_x = [-5, -4, -3, -2, -1, 0, 1, 2, 3];
    $correct_r = [1, 1.5, 2, 2.5, 3];

    return in_array($x, $correct_x)
        and $y > -3 and $y < 3
        and in_array($r, $correct_r);
}

function error($error) {
    echo json_encode(["error" => $error]);
    exit(1);
}

$req_args = ["x", "y", "r"];
foreach($req_args as $check) {
    if(!isset($_POST[$check]))
        error("arg '$check' is undefined");
    if(!is_numeric($_POST[$check]))
        error("arg '$check' is not a number");
}

$x = $_POST["x"];
$y = $_POST["y"];
$r = $_POST["r"];

if(!validate($x, $y, $r)) {
    error("args are not valid");
}

$result = checkHit($x, $y, $r) ? "Попал!" : "Промазал :(";

date_default_timezone_set("UTC");
$datetime = date("Y-m-d H:i:s e");
$time = round((microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"]) * 1e3, 3);

$out = [
    "x" => $x,
    "y" => $y,
    "r" => $r,
    "result" => $result,
    "datetime" => $datetime,
    "exectime" => $time
];
//$out = "$x;$y;$r;$result;$datetime;$time"."ns";

$_SESSION['table'][] = $out;
echo json_encode($out, JSON_UNESCAPED_UNICODE);
