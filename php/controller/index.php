<?php
defined('RBAC') || die(401.3);

$action = 'index';

if(isset($_REQUEST['action'])) {
  $action = $_REQUEST['action'];
}

switch ($action) {
  case 'get':
    $res = 'get';
    break;
  
  default:
    $res = 'index';
    break;
}

echo $res;