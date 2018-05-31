version: '3'
services:
  mysql:
	image: mysql:5.7
	container_name: mysql
	command: mysqld --sql_mode="" --lower_case_table_names=1
	volumes:
	 - ./sql:/docker-entrypoint-initdb.d
	environment:
	 - MYSQL_ROOT_PASSWORD=helciodasilva
	 - MYSQL_DATABASE=helciodasilva
	ports:
	 - "3306:3306"