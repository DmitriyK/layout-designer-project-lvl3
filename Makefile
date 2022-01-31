install:
	npm install

start:
	npx gulp develop

lint:
	npx stylelint ./app/scss/**/*.scss

deploy:
	surge ./build/