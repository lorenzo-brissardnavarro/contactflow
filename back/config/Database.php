<?php
namespace App\Config;

use PDO;

class Database
{
    private $pdo;

    public function getConnection()
    {
        if ($this->pdo === null) {
            $env = parse_ini_file(__DIR__ . '/../../.env');
            $this->pdo = new PDO("mysql:host={$env['DB_HOST']};dbname={$env['DB_NAME']};charset=utf8", $env['DB_USER'], $env['DB_PASS'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        }
        return $this->pdo;
    }
}