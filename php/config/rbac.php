<?php
return array(
  array(
    'account' => 'admin',
    'role' => 'admin',
    'authorized' => array(
      'index/index',
      'index/get',
      'pdo/index',
      'phpinfo/index'
    )
  ),
  array(
    'account' => 'user',
    'role' => 'user',
    'authorized' => array(
      'index/index',
      'index/get'
    )
  ),
  array(
    'account' => 'guest',
    'role' => 'guest',
    'authorized' => array(
    )
  )
);