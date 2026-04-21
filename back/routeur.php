<?php
header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require '../vendor/autoload.php';

use App\Controllers\ContactController;

$controller = new ContactController();
$action = $_GET['action'] ?? '';

if ($action !== 'export') {
    header('Content-Type: application/json');
}

switch ($action) {
    case 'index':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $controller->index();
        }
        break;
    case 'store':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $controller->store();
        }
        break;
    case 'edit':
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $controller->edit();
        }
        break;
    case 'remove':
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $controller->remove();
        }
        break;
    case 'like':
        if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
            $controller->like();
        }
        break;
    case 'export':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $controller->exportCSV();
        }
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Action inconnue']);
}