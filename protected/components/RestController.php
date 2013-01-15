<?php
/**
 * 目前采用类REST风格进行资源的交互，用户的验证依然依靠Session
 * @author Nay
 *
 */
class RestController extends CController
{
	/**
	 * 记录客户端要求返回的mimetype
	 * @var string
	 */
	private $_responseType;
	/**
	 * 处理请求时传入的参数，根据request content type来解析数据，
	 * 目前主要处理两种类型，
	 * application/json通过JSON传入的参数
	 * multipart/form-data上传文件时候用到
	 * @see CController::getActionParams()
	 */
	public function getActionParams(){
		$params=array();
		if(isset($_GET['id']))
			$params['id']=$_GET['id'];
		
		$contentType="";
		if(isset($_SERVER['CONTENT_TYPE'])){
			$contentType=$_SERVER['CONTENT_TYPE'];
		}
		if($contentType=='application/json'){
			$data = file_get_contents('php://input');
			$data=json_decode($data,true);
			$params['data']=$data;
		}else if(strpos($contentType, 'multipart/form-data')>=0){
			if(isset($_GET['type'])){
				$params['type']=$_GET['type'];
			}
		}
		return $params;
	}
	
	/**
	 * 执行完之后调用此方法返回信息
	 * @param number $status
	 * @param string $body
	 * @param string $content_type
	 */
	protected  function _sendResponse($status = 200, $body = '')
	{
		$status_header = 'HTTP/1.1 ' . $status . ' ' . $this->_getStatusCodeMessage($status);
		
		/*TODO 此处可以添加多种返回格式*/
		//根据accept参数转换格式,默认采用JSON返回值
		switch($this->_responseType){
			case 'application/xml':
				/* TODO 编写格式化xml格式的语句*/
			default:
				$body=json_encode($body);
				break;
		}
		header($status_header);
		header('Content-type: ' . $this->_responseType);
		echo $body;
		Yii::app()->end();
	}
	
	/**
	 * 错误信息MAP
	 * @param int $status
	 * @return string
	 */
	private function _getStatusCodeMessage($status)
	{
		$codes = Array(
				200 => 'OK',
				400 => 'Bad Request',
				401 => 'Unauthorized',
				402 => 'Payment Required',
				403 => 'Forbidden',
				404 => 'Not Found',
				500 => 'Internal Server Error',
				501 => 'Not Implemented',
		);
		return (isset($codes[$status])) ? $codes[$status] : '';
	}
	
	/**
	 * 客户端请求的参数
	 * @see CController::beforeAction()
	 */
	public function beforeAction($event)
	{
		$this->_responseType=$_SERVER["HTTP_ACCEPT"];
		if(isset($_GET['filter']))
			$this->restFilter = $_GET['filter'];
	
		if(isset($_GET['sort']))
			$this->restSort = $_GET['sort'];
	
		if(isset($_GET['limit']))
			$this->restLimit = $_GET['limit'];
	
		if(isset($_GET['offset']))
			$this->restOffset = $_GET['offset'];
	
		return parent::beforeAction($event);
	}
	
	/**
	 * 定义访问规则
	 * @see CController::accessRules()
	 */
	public function accessRules()
	{
		/* TODO根据RBAC设定访问权限 */
		$restAccessRules = array(
				array('allow',	// allow all users to perform 'index' and 'view' actions
						'actions'=>array('list', 'view', 'create', 'update', 'delete'),
						'users'=>array('*'),
				));
	
		if(method_exists($this, '_accessRules'))
			return CMap::mergeArray($restAccessRules, $this->_accessRules());
		else
			return $restAccessRules;
	}
	/**
	 * 设置过滤器
	 * @see CController::filters()
	 */
	public function filters() {
		$restFilters = array('restAccessRules+ list view create update delete');
		if(method_exists($this, '_filters'))
			return CMap::mergeArray($restFilters, $this->_filters());
		else
			return $restFilters;
	}
	

	
	/**
	 * 自定义的应用于Rest的过滤器
	 * @param unknown $c
	 */
	public function filterRestAccessRules( $c )
	{
		/* TODO 应用REST过滤器规则*/
		$c->run();
		/*
		Yii::app()->clientScript->reset(); //Remove any scripts registered by Controller Class
		//For requests from JS check that a user is loged in and throw validateUser
		//validateUser can/should be overridden in your controller.
		if(!Yii::app()->user->isGuest && $this->validateAjaxUser($this->action->id))
			$c->run();
		else
		{
			Yii::app()->errorHandler->errorAction = '/' . $this->uniqueid . '/error';
	
			if(!(isset($_SERVER['HTTP_X_'.self::APPLICATION_ID.'_USERNAME']) and isset($_SERVER['HTTP_X_'.self::APPLICATION_ID.'_PASSWORD']))) {
				// Error: Unauthorized
				throw new CHttpException(401, 'You are not authorized to proform this action.');
			}
			$username = $_SERVER['HTTP_X_'.self::APPLICATION_ID.'_USERNAME'];
			$password = $_SERVER['HTTP_X_'.self::APPLICATION_ID.'_PASSWORD'];
			// Find the user
			if($username != self::USERNAME)
			{
				// Error: Unauthorized
				throw new CHttpException(401, 'Error: User Name is invalid');
			}
			else if($password != self::PASSWORD)
			{
				// Error: Unauthorized
				throw new CHttpException(401, 'Error: User Password is invalid');
			}
			// This tells the filter chain $c to keep processing.
			$c->run();
		}*/
	}
	
	
}