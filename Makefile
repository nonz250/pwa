.PHONY: all

all: build up ## Entry command.

up:
	docker compose up -d app

build:
	-docker rmi nonz250-pwa-node:latest
	docker build --target builder -t nonz250-pwa-node:latest .
	docker compose build app
