<?php

$conn = mysqli_connect(
    "sql211.infinityfree.com",
    "if0_42924889",
    "neha7096",
    "if0_42924889_smart_library",
    3306
);

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

?>