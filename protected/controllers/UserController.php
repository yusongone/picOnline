<?php
class UserController extends CController{
	private function checkUserByAccount($account){
			$criteria=new CDbCriteria;
			$criteria->select=array('name');  
			$criteria->condition='accounts=:account';
			$criteria->params=array(':account'=>$account);
			$User=User::model()->count($criteria);
			if($User>0){
				return false;
			}else{
				return true;
			}
	}



	public function actionIndex(){
	//	$list=User::model()->findAll();
	//	echo CJSON::encode($list);
	}
	public function actionNewUser(){
			$name=$_POST['name'];
			$account=$_POST['account'];
			if($this->checkUserByAccount($account)){
				$User=new User;
				$User->name=$name;
				$User->accounts=$account;
				$User->save();
				echo json_encode(array('result'=>'ok'));
			}else{
				echo json_encode(array('result'=>'faild','message'=>'帐号存在'));
			}
	}
	public function actionSearchUserByAccount(){
			$account=$_POST['account'];
			$result=$this->checkUserByAccount($account);
			echo json_encode(array('result'=>$result));
	}
	public function actionGetUserList(){
			$num=$_POST['pageNum'];
			$size=$_POST['pageSize'];
			//$criteria=new CDbCriteria;
			//$criteria->select=array('name','accounts');  
			$User=User::model()->findAll();
			echo CJSON::encode(array('result'=>'ok','data'=>$User));
	}
}
