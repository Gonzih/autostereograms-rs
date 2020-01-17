with import <nixpkgs> {};
pkgs.mkShell {
  buildInputs = [
    gnumake rustup wasm-pack nodejs
  ];
}
