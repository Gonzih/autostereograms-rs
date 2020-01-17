build:
	wasm-pack build

TARGET_FILE := pkg/autostereograms_rs_bg.wasm
release:
	wasm-pack build --release
	cp -f $(TARGET_FILE) $(TARGET_FILE).unpackaged
	wasm-opt -Oz -o $(TARGET_FILE) $(TARGET_FILE).unpackaged
	cd www && npm run build
	rm public/* -rf
	cp -r www/dist public
	cp -r www/CNAME public/
	cp -r www/samples public/

npm-install:
	cd www && npm install

serve:
	cd www && npm run start

TS := $(date)
ifdef GH_TOKEN
PUBLIC_URL = https://$(GH_TOKEN)@github.com/Gonzih/autostereograms-rs.git
else
PUBLIC_URL = git@github.com:Gonzih/autostereograms-rs.git
endif
public:
	git clone -b gh-pages $(PUBLIC_URL) public

setup:
	rustup default nighly
