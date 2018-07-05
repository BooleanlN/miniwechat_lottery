<?php
header("Content-Type: text/html; charset=UTF-8");
$appid = "appid";
$secret = "secret";
$code = $_GET['code'];
$phe = $_GET['phone'];
$stu = $_GET['stunum'];
$name = $_GET['name'];
$url ='https://api.weixin.qq.com/sns/jscode2session?appid='.$appid.'&secret='.$secret.'&js_code='.$code.'&grant_type=authorization_code';
$curl = curl_init($url);
curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
curl_setopt($curl,CONNECTION_TIMEOUT,200);
curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type:application/json'));
curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
curl_setopt($curl,CONNECTION_TIMEOUT,200);
$out = curl_exec($curl);
$openid =  json_decode($out)->openid;
$dsn = "dbo";
$pdo = new PDO($dsn,"usr","pwd");
$critical = "SELECT * FROM Allstu WHERE stunum='$stu'";
$res_count = $pdo->query($critical);
if($res_count->rowCount()){
    $critical = "SELECT * FROM student WHERE stunum='$stu'";
    $res_count = $pdo->query($critical);
    if (!$res_count->rowCount()) {
        $sql2 = "SELECT * FROM prize_user WHERE open_id= ?";
        $pre2 = $pdo->prepare($sql2);
        $pre2->execute(array($openid));
        $res2 = $pre2->fetch(PDO::FETCH_ASSOC);
        if ($res2 == null) {
            echo json_encode(array("code" => 1, "open_id" => $openid));
        } else {
            echo json_encode(array("code" => -1));
        }
    } else {
        echo json_encode(array("code" => -2));
    }
}
else
{
    echo json_encode(array("code" => -3));
}