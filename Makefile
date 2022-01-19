install:
	npm install

start:
	npx gulp server

lint:
	npx stylelint ./app/scss/**/*.scss

deploy:
	surge ./build/