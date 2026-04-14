<?php
namespace App\Models;

use App\Config\Database;
use PDO;

class Contact extends Database
{
    public function index(): array{
        $sql = "SELECT * FROM contacts";
        $query = $this->getConnection()->prepare($sql);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public function show(int $id): array{
        $sql = "SELECT * FROM contacts WHERE id = :id";
        $query = $this->getConnection()->prepare($sql);
        $query->execute(['id' => $id]);
        $result = $query->fetch(PDO::FETCH_ASSOC);
        return $result ? $result : [];
    }

    public function store(array $dataContact): bool{
        $sql = "INSERT INTO contacts (prenom, nom, email, telephone) VALUES (:prenom, :nom, :email, :telephone)";
        $query = $this->getConnection()->prepare($sql);
        return $query->execute([':prenom' => $dataContact['prenom'], ':nom' => $dataContact['nom'], ':email' => $dataContact['email'], ':telephone' => $dataContact['telephone']]);
    }

    public function edit(int $id, array $dataContact): bool{
        $sql = "UPDATE contacts SET prenom = :prenom, nom = :nom, email = :email, telephone = :telephone WHERE id = :id";
        $query = $this->getConnection()->prepare($sql);
        return $query->execute([':prenom' => $dataContact['prenom'], ':nom' => $dataContact['nom'], ':email' => $dataContact['email'], ':telephone' => $dataContact['telephone'], ':id' => $id]);
    }

    public function remove(int $id): bool{
        $sql = "DELETE FROM contacts WHERE id = :id";
        $query = $this->getConnection()->prepare($sql);
        return $query->execute([':id' => $id]);
    }
}