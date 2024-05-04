up:
	@echo "starting containers"
	docker-compose up --build -d --remove-orphans

down:
	@echo "Stoping containers"
	docker-compose down