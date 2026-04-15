<?php
namespace App\Controllers;

use App\Models\Contact;

class ContactController
{
    public function index(){
        $contact = new Contact();
        $data = $contact->index();
        echo json_encode(["success" => true, "data" => $data]);
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
}