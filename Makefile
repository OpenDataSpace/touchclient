dist: clean 
	mkdir build
	mkdir build/touchui
	rsync -r * build/touchui

clean: 
	rm -rf build
