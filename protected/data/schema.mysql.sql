create table sample(
	id int not null primary key auto_increment comment '标识',
	title varchar(128) not null comment '标题',
	content varchar(2048) comment '内容'
)charset utf8;
