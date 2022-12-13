# svelte

````shell
npx degit sveltejs/template .
node scripts/setupTypeScript.js 

yarn
````

# anchor & solana

please copy
- `target/idl` and `target/types` to `src`

````shell
yarn add @project-serum/anchor @solana/web3.js
````

# rollup
please check `tsconfig.json` and add
````shell
# for idl json file
"compilerOptions": {
    "resolveJsonModule": true
  },

````

yarn add @rollup/plugin-json rollup-plugin-node-builtins rollup-plugin-node-globals

please check `rollup.config.js` for `added ...` parts

# ready
please run 
````shell
yarn dev
````