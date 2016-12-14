<?php
defined('RBAC') || define('RBAC', true);

$controller = 'index';
if(isset($_REQUEST['controller'])) {
  $controller = $_REQUEST['controller'];
}

$action = 'index';
if(isset($_REQUEST['action'])) {
  $action = $_REQUEST['action'];
}

$rbac = require_once('./config/rbac.php');

$account = 'guest';
//取角色
if(isset($_REQUEST['account'])) {
  $account = $_REQUEST['account'];
  $index = 0;
  foreach ($rbac as $key => $value) {
    if($value['account'] == $account) {
      $current = $index;
    }
    $index++;
  }
}
//当前操作
if(isset($current)) {
  $ca = $controller . '/' . $action;
  if(in_array($ca, $rbac[$current]['authorized'])) {
    $controller_file = './controller/'. $controller . '.php';
    if(file_exists($controller_file)) {
      require_once($controller_file);
    } else { 
      die('404: '. $controller_file);
    }
  } else {
    die('401: ' . $account . '@' . $ca);
  }
} else {
  die('403');
}