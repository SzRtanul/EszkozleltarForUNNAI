<?php
    if(!empty($_POST['data'])){
        $data = $_POST['data'];
        $fname = "data.txt";
        $file = fopen("upload/" .$fname, 'w');
        fwrite($file, $data);
        fclose($file);
    }
?>