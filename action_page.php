<?php
// Specify the directory where you want to save the uploaded files
$uploadDir = "/Uploads";

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if a file was uploaded
    if (isset($_FILES["filename"])) {
        $file = $_FILES["filename"];
        $fileName = $file["name"];
        $fileTmpName = $file["tmp_name"];
        $fileSize = $file["size"];
        $fileError = $file["error"];

        // Move the uploaded file to the specified directory
        if (move_uploaded_file($fileTmpName, $uploadDir . $fileName)) {
            echo "File uploaded successfully!";
        } else {
            echo "Error uploading file!";
        }
    } else {
        echo "No file uploaded!";
    }
}
?>