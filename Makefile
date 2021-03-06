build:
	wasm-pack build

cargo-watch-build:
	cargo watch -w src/ -s 'make build'

TARGET_FILE := pkg/autostereograms_rs_bg.wasm
release:
	wasm-pack build --release
	cp -f $(TARGET_FILE) $(TARGET_FILE).unpackaged
	wasm-opt -Oz -o $(TARGET_FILE) $(TARGET_FILE).unpackaged
	cd www && npm run build
	rm public/* -rf
	cp -r www/dist/* public/
	cp -r www/CNAME public/
	cp -r www/samples public/

npm-install:
	cd www && npm install

serve:
	cd www && npm run start

ifdef GH_TOKEN
PUBLIC_URL = https://$(GH_TOKEN)@github.com/Gonzih/autostereograms-rs.git
else
PUBLIC_URL = git@github.com:Gonzih/autostereograms-rs.git
endif
public:
	git clone -b gh-pages $(PUBLIC_URL) public

setup:
	rustup default nightly

setup-git:
	git config --global user.email "$(GIT_EMAIL)"
	git config --global user.name "$(GIT_NAME)"

commit:
	cd public \
	&& git add  . \
	&& (git commit -a -m "Website updated at $(shell date)"  || echo "Nothing to commit") \
	&& git push
