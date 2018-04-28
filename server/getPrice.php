<?php
$openid= $_GET['openid'];
$phe = $_GET['phone'];
$stu = $_GET['stunum'];
$name = $_GET['name'];
$arr = [60,120,180,240,300,360,180,120,120,120,300,120,300,180,120,60,300,120,120,120,120,120];
echo count($arr);
$count=$arr[array_rand($arr,1)];
$dsn = "mysql:host=localhost;dbname=sport";
$pdo = new PDO($dsn,"root","six666666");
        $sql = "SELECT count FROM prize WHERE prize_name= ? ";
        $pre = $pdo->prepare($sql);
        if($count==60)
        {
            $str = "disk";
            $pre->execute(array($str));
            $res = $pre->fetch(PDO::FETCH_ASSOC);
            if(intval($res['count'])>0)
            {
                $renew = $res['count']-1;
                $up = "UPDATE  prize set count = '$renew' WHERE prize_name='$str'";
                $pdo->exec($up);
                $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','one','$stu','$name','$phe')";
                $pdo->exec($up2);
                echo $count;
            }else{
                $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','none','$stu','$name','$phe')";
                $pdo->exec($up2);
                echo intval($res['count']);
            }
        }
        else if($count==180)
        {
            $str = "book";
            $pre->execute(array($str));
            $res = $pre->fetch(PDO::FETCH_ASSOC);
            if(intval($res['count'])>0)
            {
                $renew = $res['count']-1;
                $up = "UPDATE  prize set count = '$renew' WHERE prize_name='$str'";
                $pdo->exec($up);
                $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','two','$stu','$name','$phe')";
                $pdo->exec($up2);
                echo $count;
            }else{
                $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','none','$stu','$name','$phe')";
                $pdo->exec($up2);
                echo intval($res['count']);
            }
        }
        else if($count==300)
        {
            $str = "small";
            $pre->execute(array($str));
            $res = $pre->fetch(PDO::FETCH_ASSOC);
            if(intval($res['count'])>0)
            {
                $renew = $res['count']-1;
                $up = "UPDATE  prize set count = '$renew' WHERE prize_name='$str'";
                $pdo->exec($up);
                $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','three','$stu','$name','$phe')";
                $pdo->exec($up2);
                echo $count;
            }else{
                $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','none','$stu','$name','$phe')";
                $pdo->exec($up2);
                echo intval($res['count']);

            }
        }
        else {
            $up2 = "INSERT into prize_user(open_id,award,xh,xm,tele)VALUES ('$openid','none','$stu','$name','$phe')";
            $pdo->exec($up2);
            echo $count;
        }