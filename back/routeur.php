<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require '../vendor/autoload.php';

use App\Controllers\ContactController;

$controller = new ContactController();
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'index':  $controller->index(); break;
    case 'store': $controller->store(); break;
    case 'edit': $controller->edit(); break;
    case 'remove':  $controller->remove(); break;
    case 'like':  $controller->like(); break;
    default:
        echo json_encode(['success' => false, 'message' => 'Action inconnue']);
}