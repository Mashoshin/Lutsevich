<?php
/**
 * @var string $answer
 */
?>
<html>
<head>
    <title>SANEK</title>
    <link rel="stylesheet" type="text/css" href="/sources/style.css">
</head>
<body>
<div>
    <h1>Поиграй с Саньком</h1>
    <div class="main">
        <img class="sanek" src="/sources/luts.jpg" alt="">
        <img class="talk" src="/sources/talk.png" alt="">
        <h1 class="say"><?php echo $answer; ?></h1>
    </div>
    <br><br>
    <div style="padding: 10px">
        <button type="button" onclick="window.location.href = '/finger';">Пальчик в попку</button>
    </div>
    <div>
        <button type="button" onclick="window.location.href = '/hui';">Приписюнить</button>
    </div>
</div>
</body>
</html>
