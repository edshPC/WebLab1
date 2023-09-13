<?php

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

$x = $_POST["x"];
$y = $_POST["y"];
$r = $_POST["r"];

$result = checkHit($x, $y, $r) ? "Попал!" : "Промазал :(";
date_default_timezone_set("Europe/Moscow");
$datetime = date("Y-m-d H:i:s");
$time = round((microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"]) * 1e3, 3);

echo "$x;$y;$r;$result;$datetime;$time"."ns";
