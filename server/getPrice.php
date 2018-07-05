<?php
$openid= $_GET['openid'];
$phe = $_GET['phone'];
$stu = $_GET['stunum'];
$name = $_GET['name'];
$arr =[0,3,13,163,2000];
$rand = rand(0,2000);
$count = 0;
foreach ($arr as $item=>$value)
{
        if($value>$rand)
        {
            $count = $item*60;
            break;
        }
}
$dsn = "---";
$pdo = new PDO($dsn,"user","pwd",array(
    PDO::MYSQL_ATTR_INIT_COMMAND=>"set names utf8"
    )
);
//判断抽奖资格
    $sql = "SELECT count FROM prize WHERE prize_name= ? ";
    $pre = $pdo->prepare($sql);
    //一等奖
    if ($count == 60) {
        $str = "first";
        $pre->execute(array($str));
        $res = $pre->fetch(PDO::FETCH_ASSOC);
        if (intval($res['count']) > 0) {
            $renew = $res['count'] - 1;
            $up = "UPDATE  prize set count = '$renew' WHERE prize_name='$str'";
            $pdo->exec($up);
            $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','一等奖','$stu','$name','$phe')";
            $pdo->exec($up2);
            echo $count;
        } else {
            $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','none','$stu','$name','$phe')";
            $pdo->exec($up2);
            echo 120;
        }
    }//二等奖
     else if ($count == 120) {
        $str = "second";
        $pre->execute(array($str));
        $res = $pre->fetch(PDO::FETCH_ASSOC);
        if (intval($res['count']) > 0) {
            $renew = $res['count'] - 1;
            $up = "UPDATE  prize set count = '$renew' WHERE prize_name='$str'";
            $pdo->exec($up);
            $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','二等奖','$stu','$name','$phe')";
            $pdo->exec($up2);
            echo 240;
        } else {
            $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','none','$stu','$name','$phe')";
            $pdo->exec($up2);
            echo 120;
        }
    }//三等奖 
    else if ($count == 180) {
        $str = "third";
        $pre->execute(array($str));
        $res = $pre->fetch(PDO::FETCH_ASSOC);
        if (intval($res['count']) > 0) {
            $renew = $res['count'] - 1;
            $up = "UPDATE  prize set count = '$renew' WHERE prize_name='$str'";
            $pdo->exec($up);
            $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','三等奖','$stu','$name','$phe')";
            $pdo->exec($up2);
            echo $count;
        } else {
            $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','none','$stu','$name','$phe')";
            $pdo->exec($up2);
            echo 120;

        }
    }//没有中奖
     else {
        $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','none','$stu','$name','$phe')";
        $pdo->exec($up2);
        echo 120;
    }
