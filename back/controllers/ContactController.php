<?php
namespace App\Controllers;

use App\Models\Contact;

class ContactController{
    
    public function index() {
        if(isset($_GET['page'])){
            $page = (int) $_GET['page'];
        } else {
            $page = 1;
        }

        if(isset($_GET['limit'])){
            $limit = (int) $_GET['limit'];
        } else {
            $limit = 3;
        }

        if(isset($_GET['keyword'])){
            $keyword = $_GET['keyword'];
        } else {
            $keyword = "";
        }

        if(isset($_GET['favorite'])){
            $favorite = 1;
        } else {
            $favorite = 0;
        }

        $offset = ($page - 1) * $limit;

        $contact = new Contact();
        $data = $contact->getPaginated($limit, $offset, $keyword, $favorite);
        $total = $contact->countAll($keyword, $favorite);

        echo json_encode(['success' => true, 'data' => $data, 'total' => $total]);
    }

    public function store(){
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data) {
            echo json_encode(['success' => false, 'message' => 'Données invalides']);
            return;
        }

        $contact = new Contact();
        $success = $contact->store($data);
        echo json_encode(['success' => $success]);
    }

    public function edit(){
        $data = json_decode(file_get_contents("php://input"), true);

        $id = $data['id'];

        if (!$id) {
            echo json_encode(['success' => false, 'message' => 'ID manquant']);
            return;
        }

        $contact = new Contact();
        $success = $contact->edit($id, $data);
        echo json_encode(['success' => $success]);
    }

    public function remove(){
        $data = json_decode(file_get_contents("php://input"), true);

        $id = $data['id'];

        if (!$id) {
            echo json_encode(['success' => false, 'message' => 'ID manquant']);
            return;
        }

        $contact = new Contact();
        $success = $contact->remove($id);
        echo json_encode(['success' => $success]);
    }

    public function like() {
        $data = json_decode(file_get_contents("php://input"), true);

        $id = $data['id'];
        $contact = new Contact();
        $current = (int) $contact->getFavorite($id);
        $newFavorite = $current === 1 ? 0 : 1;
        $success = $contact->updateFavorite($id, $newFavorite);
        echo json_encode(['success' => $success, 'favoris' => $newFavorite]);
    }
}