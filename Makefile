dist: clean
	mkdir -p build/touchui
	rsync -r --exclude metadata --exclude simulator --exclude touchui.tgz * build/touchui
	cp build/touchui/app.html build/touchui/index.html
	tar -C build -czf touchui.tgz touchui

clean: 
	rm -rf build
