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

function validate($x, $y, $r): bool {
    $correct_x = [-5, -4, -3, -2, -1, 0, 1, 2, 3];
    $correct_r = [1, 1.5, 2, 2.5, 3];

    return is_numeric($x) and is_numeric($y) and is_numeric($r)
        and in_array($x, $correct_x)
        and $y > -3 and $y < 3
        and in_array($r, $correct_r);
}
    

$x = $_POST["x"];
$y = $_POST["y"];
$r = $_POST["r"];

if(validate($x, $y, $r)) {
    $result = checkHit($x, $y, $r) ? "Попал!" : "Промазал :(";
} else {
    $result = 'Ошибка';
}

date_default_timezone_set("Europe/Moscow");
$datetime = date("Y-m-d H:i:s");
$time = round((microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"]) * 1e3, 3);

echo "$x;$y;$r;$result;$datetime;$time"."ns";
