<?php
header('Content-type:application/json;charset=utf-8');
$request = file_get_contents('php://input');
$file = json_decode($request);
if($file){
  $uploaded_file = array('name' => $file->name, 'size' => $file->size);
  sleep(1);
  echo json_encode($uploaded_file, JSON_UNESCAPED_UNICODE);
}
?>
