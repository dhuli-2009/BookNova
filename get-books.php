
<?php
header('Content-Type: application/json; charset=utf-8');

$baseFolder = __DIR__ . '/books';

$categories = [
    'Brids&nature books' => 'Birds & Nature',
    'food and drinks books' => 'Food & Drinks',
    'love story books' => 'Love Story'
];

$books = [];

foreach ($categories as $folder => $category) {

    $folderPath = $baseFolder . DIRECTORY_SEPARATOR . $folder;

    if (!is_dir($folderPath)) {
        continue;
    }

    foreach (scandir($folderPath) as $file) {

        if ($file === '.' || $file === '..') {
            continue;
        }

        if (strtolower(pathinfo($file, PATHINFO_EXTENSION)) !== 'pdf') {
            continue;
        }

        $title = pathinfo($file, PATHINFO_FILENAME);
        $title = str_replace(['-', '_'], ' ', $title);
        $title = preg_replace('/\s+/', ' ', $title);
        $title = ucwords($title);

        $books[] = [
            'title' => $title,
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
