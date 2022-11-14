
please install [pop!_OS](https://pop.system76.com/) which is a developer friendly `ubuntu` clone to follow up this `bootcamp`

⚠️ `rust` still has problems on `windows` so either use `pop-os` or your preferred `os`  
⚠️ `pop.os` is not required but it's stable and developer friendly

- open a terminal
- update and install `build-essential, cmake`

````shell
sudo apt-get update
sudo apt-get install build-essential cmake -y
```` 

- please install `zsh`

````shell
sudo apt install zsh -y
chsh -s /bin/zsh # logout & login
````

- next install `rust`

````shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 1. select 'Customize installation'
# 2. continue but only say 'no' to 'Modify PATH variable ?'
# 3. then select 'Proceed with installation' when asked again
````

- next create your `.zshrc` file

```` shell
cat << 'EOF' >> .zshrc
export RUST_HOME=$HOME/.cargo
export PATH=$RUST_HOME/bin:$PATH
EOF
````

- next open a new terminal or run `source .zshrc`
- next install some `rust` linux tools for `show-off`

````shell
# 1. better shell (rust)
cargo install starship --locked

# after installation finishes
echo 'eval "$(starship init zsh)"' >> .zshrc
source .zshrc

# 2. node version manager (rust)
cargo install fnm

#after installation finishes
echo 'eval "$(fnm env --use-on-cd)"' >> .zshrc
source .zshrc

# 3. colorful ls (rust)
cargo install exa

# after installation finishes
cat << 'EOF' >> .zshrc

alias ls='exa'                                                          
alias l='exa -lbF --git'                                                
alias ll='exa -lbGF --git'                                             
alias llm='exa -lbGd --git --sort=modified'                            
alias la='exa -lbhHigUmuSa --time-style=long-iso --git --color-scale'  
alias lx='exa -lbhHigUmuSa@ --time-style=long-iso --git --color-scale' 
alias lS='exa -1'                                                              
alias lt='exa --tree --level=2'                                         

EOF

source .zshrc

````

- finally install [node.js](https://nodejs.org/en/) using `fnm`

````shell
fnm list-remote
fnm install v16.18.1
````

now we are ready to boost :)