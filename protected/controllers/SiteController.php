<?php
class SiteController extends CController{
	public function actionIndex(){
		$OrderList=OrderList::model()->findAll();
		$this->render('index',array("list"=>$OrderList));
	}
	public function actionManageMyUser(){
		$this->render('manageMyUser');
	}
	public function actionBindProduct(){
		$this->render('bindProduct');
	}
	public function actionBindPic(){
		$this->render('bindPic');
	}
	public function actionManageProduct(){
		$this->render('manageProduct');
	}
	public function actionShowTidy(){
		$this->render('showTidy');
	}
	public function actionSelectPic(){
		$this->render('selectPic');
	}
}
?>
