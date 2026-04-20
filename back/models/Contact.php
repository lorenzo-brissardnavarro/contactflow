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
        $sql = "INSERT INTO contacts (prenom, nom, email, telephone, favoris) VALUES (:prenom, :nom, :email, :telephone, :favoris)";
        $query = $this->getConnection()->prepare($sql);
        return $query->execute([':prenom' => $dataContact['prenom'], ':nom' => $dataContact['nom'], ':email' => $dataContact['email'], ':telephone' => $dataContact['telephone'], ':favoris' => 0]);
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

    public function getPaginated($limit, $offset, $keyword = '', $favorite = 0) {
        $sql = "SELECT * FROM contacts";
        $conditions = [];
        $params = [];

        if ($keyword !== '') {
            $conditions[] = "(prenom LIKE :keyword OR nom LIKE :keyword OR email LIKE :keyword)";
            $params[':keyword'] = "%$keyword%";
        }

        if ($favorite == 1) {
            $conditions[] = "favoris = :favorite";
            $params[':favorite'] = 1;
        }

        if (!empty($conditions)) {
            $sql .= " WHERE " . implode(" AND ", $conditions);
        }

        $sql .= " LIMIT :limit OFFSET :offset";

        $query = $this->getConnection()->prepare($sql);
        foreach ($params as $key => $value) {
            $query->bindValue($key, $value);
        }
        $query->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
        $query->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public function countAll($keyword = '', $favorite = 0) {
        $sql = "SELECT COUNT(*) as total FROM contacts";
        $conditions = [];
        $params = [];

        if ($keyword !== '') {
            $conditions[] = "(prenom LIKE :keyword OR nom LIKE :keyword OR email LIKE :keyword)";
            $params[':keyword'] = "%$keyword%";
        }

        if ($favorite == 1) {
            $conditions[] = "favoris = :favorite";
            $params[':favorite'] = 1;
        }

        if (!empty($conditions)) {
            $sql .= " WHERE " . implode(" AND ", $conditions);
        }

        $query = $this->getConnection()->prepare($sql);
        foreach ($params as $key => $value) {
            $query->bindValue($key, $value);
        }
        $query->execute();
        $result = $query->fetch();
        return (int)$result['total'];
    }

    public function updateFavorite($id, $favorite): bool {
        $sql = "UPDATE contacts SET favoris = :favoris WHERE id = :id";
        $query = $this->getConnection()->prepare($sql);
        $query->execute([':favoris' => $favorite ? 1 : 0, ':id' => $id]);
        return true;
    }

    public function getFavorite($id){
        $sql = "SELECT favoris FROM contacts WHERE id = :id";
        $query = $this->getConnection()->prepare($sql);
        $query->execute([':id' => $id]);
    return $query->fetchColumn();
    }

}