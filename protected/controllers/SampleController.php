<?php
class SampleController extends CController{
	public function actionIndex(){
		$list=Sample::model()->findAll();
		echo CJSON::encode($list);
	}
	public function actionView($id){
		$sample=Sample::model()->findByPk($id);
		//调用getAttributes方法，以获得简单数据，否则activeRecord是一个复杂对象
		echo json_encode($sample->getAttributes());
	}
	public function actionCreate(){
		$sample=new Sample();
		$sample->title='新标题';
		$sample->content="新内容";
		$sample->save();
		echo $sample->id;
	}
}
?>