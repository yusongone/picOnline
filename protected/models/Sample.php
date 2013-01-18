<?php
class Sample extends CActiveRecord{
	
	/**
	 * 固定写法
	 * @param system $className
	 * @return Ambigous <unknown, multitype:>
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	/**
	 * 把表名按格式写上就好了
	 * @see CActiveRecord::tableName()
	 */
	public function tableName()
	{
		return 'sample';
	}
}
?>