<!DOCTYPE html>
<html>
  <head>
    <title>Getting Started with MUI</title>
   <?php include('includes/head.php'); ?>
  </head>
  <body class="doc GettingStarted">
  <?php include('includes/header.php'); ?>
  <?php include('includes/nav.php');?>
  <div class="content">
  <?php
include_once('markdown.php');
$markdown = file_get_contents('getting_started.mdown');
$html = Markdown($markdown);
echo($html);
?>
  </div>
  </body>  
</html>
