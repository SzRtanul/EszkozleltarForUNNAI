<?php
    if(!empty($_POST['data']) && !empty($_POST['fname'])){
        $data = $_POST['data'];
        $fname = $_POST['fname'].".txt";
        $file = fopen("../data/" .$fname, 'w');
        fwrite($file, $data);
        fclose($file);
    }
?>