<?php

if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['phone']) && !empty($_POST['type'])) {
    $userData[] = trim(filter_var($_POST['name'], FILTER_SANITIZE_STRING));
    $userData[] = trim(filter_var($_POST['email'], FILTER_VALIDATE_EMAIL));
    $userData[] = trim(filter_var($_POST['phone'], FILTER_SANITIZE_STRING));
    $userData[] = trim(filter_var($_POST['type'], FILTER_SANITIZE_STRING));

    if (!in_array(null, $userData)) {

        $phoneRegExp = "/^(?:0(?!(5|7))(?:2|3|4|8|9))(?:-?\d){7}$|^(0(?=5|7)(?:-?\d){9})$/";

        if (mb_strlen($userData[0]) > 2 && mb_strlen($userData[0]) < 50) {

            if (preg_match($phoneRegExp, $userData[2])) {
                $dbcon = 'mysql:host=160.153.156.41;dbname=landing_page_eran;charset=utf8';
                $db = new PDO($dbcon, 'erantzurLP', 'Tz1234ur');
                $sql = "INSERT INTO contacts VALUES('',?,?,?,?,NOW())";
                $query = $db->prepare($sql);
                // Send mail with user data to company
                echo $query->execute($userData);

            }

        }

    }

}
