build:
	wasm-pack build

TARGET_FILE := pkg/autostereograms_rs_bg.wasm
release:
	wasm-pack build --release
	cp -f $(TARGET_FILE) $(TARGET_FILE).unpackaged
	wasm-opt -Oz -o $(TARGET_FILE) $(TARGET_FILE).unpackaged
	cd www && npm run build
	rm docs -rf
	cp -r www/dist docs

npm-install:
	cd www && npm install

serve:
	cd www && npm run start
