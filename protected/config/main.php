<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'new Site',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
	),

	'modules'=>array(
		// uncomment the following to enable the Gii tool
		/*
		'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'Enter Your Password Here',
			// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1','::1'),
		),
		*/
	),

	// application components
	'components'=>array(
		'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
		),
		// uncomment the following to enable URLs in path-format
		/**/
		'urlManager'=>array(
			'urlFormat'=>'path',
			'showScriptName'=>false,
			'caseSensitive'=>false,
			'rules'=>array(
			
				//设定RESTful风格处理方式,RESTful controller全部放在rest文件夹下
				'rest/<controller:\w+>'=>array('rest/<controller>/list', 'verb'=>'GET'),
				'rest/<controller:\w+>/<id:\w+>'=>array('rest/<controller>/view', 'verb'=>'GET'),
				'rest/<controller:\w+>/<id:\w+>/<var:\w+>'=>array('rest/<controller>/restView', 'verb'=>'GET'),
				array('rest/<controller>/update', 'pattern'=>'rest/<controller:\w+>/<id:\d+>', 'verb'=>'PUT'),
				array('rest/<controller>/delete', 'pattern'=>'rest/<controller:\w+>/<id:\d+>', 'verb'=>'DELETE'),
				array('rest/<controller>/create', 'pattern'=>'rest/<controller:\w+>', 'verb'=>'POST'),
				array('rest/<controller>/create', 'pattern'=>'rset/<controller:\w+>/<id:\w+>', 'verb'=>'POST'),
				
 				//普通的URL美化方式
				'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',),
		),
		// uncomment the following to use a MySQL database
		
		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=test',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => 'myfuture',
			'charset' => 'utf8',
			//'tablePrefix'=>'cms_',
			//'enableParamLogging'=>true,
			//'enableProfiling'=>true,
		),
		
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
				// uncomment the following to show log messages on web pages
				/*
				array(
					'class'=>'CWebLogRoute',
				),*/
				
			),
		),
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail'=>'webmaster@example.com',
	),
);
