<?php
header('Content-Type: application/json; charset=utf-8');

$baseFolder = __DIR__ . '/books';
$books = [];

if (!is_dir($baseFolder)) {
    echo json_encode([
        'error' => 'Books folder not found'
    ]);
    exit;
}

$folders = scandir($baseFolder);

foreach ($folders as $folder) {

    if ($folder === '.' || $folder === '..') {
        continue;
    }

    $folderPath = $baseFolder . DIRECTORY_SEPARATOR . $folder;

    if (!is_dir($folderPath)) {
        continue;
    }

    $folderLower = strtolower($folder);

    if (strpos($folderLower, 'bird') !== false) {
        $category = 'Birds & Nature';
    } elseif (strpos($folderLower, 'food') !== false) {
        $category = 'Food & Drinks';
    } elseif (strpos($folderLower, 'love') !== false) {
        $category = 'Love Story';
    } elseif (strpos($folderLower, 'horror') !== false) {
        $category = 'Horror';
    } elseif (strpos($folderLower, 'psychology') !== false) {
        $category = 'Psychology';
    } else {
        $category = ucwords(str_replace(['-', '_'], ' ', $folder));
    }

    $files = scandir($folderPath);

    foreach ($files as $file) {

        if ($file === '.' || $file === '..') {
            continue;
        }

        if (strtolower(pathinfo($file, PATHINFO_EXTENSION)) !== 'pdf') {
            continue;
        }

        $title = pathinfo($file, PATHINFO_FILENAME);
        $title = str_replace(['-', '_'], ' ', $title);
        $title = preg_replace('/\s+/', ' ', $title);
        $title = ucwords(trim($title));

        $books[] = [
            'book_id' => md5($folder . '/' . $file),
            'title' => $title,
            'author' => 'Unknown',
            'category' => $category,
            'filename' => $file,
            'pdf' => 'books/' . rawurlencode($folder) . '/' . rawurlencode($file)
        ];
    }
}

echo json_encode(
    $books,
    JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
);
?>