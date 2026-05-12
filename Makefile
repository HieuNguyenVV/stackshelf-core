SHELL := /bin/sh

.PHONY: help install build dev start lint test migration-show migration-run migration-revert migration-generate migration-create seed-admin db-up db-down

help:
	@echo "Available commands:"
	@echo "  make install                      Install dependencies"
	@echo "  make build                        Build project"
	@echo "  make dev                          Run app in watch mode"
	@echo "  make start                        Run app once"
	@echo "  make lint                         Run lint"
	@echo "  make test                         Run unit tests"
	@echo "  make migration-show               Show migration status"
	@echo "  make migration-run                Run pending migrations"
	@echo "  make migration-revert             Revert latest migration"
	@echo "  make migration-generate name=...  Generate migration from entity changes"
	@echo "  make migration-create name=...    Create empty migration file"
	@echo "  make seed-admin                   Seed default admin user"
	@echo "  make db-up                        Start postgres/redis via docker compose"
	@echo "  make db-down                      Stop postgres/redis via docker compose"

install:
	pnpm install

build:
	pnpm run build

dev:
	pnpm run start:dev

start:
	pnpm run start

lint:
	pnpm run lint

test:
	pnpm run test

migration-show:
	pnpm run migration:show

migration-run:
	pnpm run migration:run

migration-revert:
	pnpm run migration:revert

migration-generate:
	$(if $(name),,$(error Usage: make migration-generate name=create-users))
	node -r ts-node/register -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate ./src/database/migrations/$(name) -d ./src/database/data-source.ts

migration-create:
	$(if $(name),,$(error Usage: make migration-create name=add-index))
	node -r ts-node/register -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:create ./src/database/migrations/$(name)

seed-admin:
	pnpm run seed:admin

db-up:
	docker compose up -d

db-down:
	docker compose down
