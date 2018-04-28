<?php
header("Content-Type: text/html; charset=UTF-8");
$appid = "wxcc00dae7a00a2141";
$secret = "88db7e6c6d4b1d7e18e5cdb2c42330de";
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
$dsn = "mysql:host=localhost;dbname=sport";
$pdo = new PDO($dsn,"root","six666666");
$sql2 = "SELECT * FROM prize_user WHERE open_id= ?";
$pre2 = $pdo->prepare($sql2);
$pre2->execute(array($openid));
$res2 = $pre2->fetch(PDO::FETCH_ASSOC);
if($res2==null)
{
    echo json_encode(array("code"=>1,"open_id"=>$openid));
}else{
    echo json_encode(array("code"=>-1));
}