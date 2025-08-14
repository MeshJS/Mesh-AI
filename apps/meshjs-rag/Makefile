.PHONY: setup setup_db pull_docs

setup: setup_db pull_docs

setup_db:
	@echo "Setting up the database"
	@python3 app/db/setup_db.py

pull_docs:
	@echo "Pulling the docs from github"
	@python3 app/services/github.py