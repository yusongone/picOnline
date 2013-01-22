<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>HOME|在线选片系统</title>
		<link type="text/css" rel="stylesheet" href="/css/bootstrap/bootstrap.min.css" />
		<link type="text/css" rel="stylesheet" href="/css/public.css" />
		<meta name="viewport" content="width=device-width">
		<script type="text/javascript" src="/js/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="/js/public.js"></script>
		<script type="text/javascript" src="/js/manageMyUser.js"></script>
	</head>
	<body>
		<div class="header">
			<div class="con">
				<div class="holder"></div>
				<div class="userTitle">尚界影音工作室 |</div>
				<div class="tools">
					<a class="btn btn-primary" id="newUser">新建用户</a>	
					<a class="link" href="/site/manageProduct" >管理产品</a>	
					<a class="link" href="/site/index" >查看订单</a>	
				</div>
			</div>
		</div>
		<div class="hideArea">
			<div class="con" id="hideCon">
			</div>
		</div>
		<div class="main">
			<div class="con">
				<table class="table" id="order">
					<thead>
						<tr><th>序列</th><th>姓名</th><th>创建日期</th><th>帐号</th><th>操作</th></tr>
						<!--?php for($i=0;$i<count($list);$i++){
								echo '<tr><td>'.$i.'</td><td></td><td>日期</td><td>状态</td><td></td></tr>';
						}
						?-->
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</body>
</html>

