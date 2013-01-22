<?php
class OrderController extends CController{
	private function test($account){
	}
	public function actionIndex(){

	}
	public function actionCreateOrder(){
			$userId=(int)$_POST['userId'];
			$createTime="2012-1-12";
			$Order=new OrderList;
			$Order->userID=$userId;
			$Order->status=1;
			$Order->createTime=$createTime;
			$Order->save();
			//$criteria=new CDbCriteria;
			//$criteria->select=array('name','accounts');  
			if($Order->id>0){
				echo CJSON::encode(array('result'=>'ok','id'=>$Order->id));
			}else{
				echo CJSON::encode(array('result'=>'faild','message'=>'msg'));
			}
	}
}
