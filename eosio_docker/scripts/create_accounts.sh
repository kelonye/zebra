#!/bin/bash
set -o errexit

echo "=== start deploy data ==="

# set PATH
PATH="$PATH:/opt/eosio/bin"

# change to script directory
cd "$(dirname "$0")"

# create account for zebrauser with above wallet's public keys
echo "=== start zebrauser account in blockchain ==="
# cleos create account eosio zebrauser EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B EOS8BCgapgYA2L4LJfCzekzeSr3rzgSTUXRXwNi8bNRoz31D14en9

echo "=== start create accounts in blockchain ==="

# download jq for json reader, we use jq here for reading the json file ( accounts.json )
mkdir -p ~/bin && curl -sSL -o ~/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64 && chmod +x ~/bin/jq && export PATH=$PATH:~/bin

# loop through the array in the json file, import keys and create accounts
# these pre-created accounts will be used for saving / erasing notes
# we hardcoded each account name, public and private key in the json.
# NEVER store the private key in any source code in your real life developmemnt
# This is just for demo purpose

jq -c '.[]' accounts.json | while read i; do
  name=$(jq -r '.name' <<< "$i")
  pub=$(jq -r '.publicKey' <<< "$i")
  priv=$(jq -r '.privateKey' <<< "$i")

  # to simplify, we use the same key for owner and active key of each account
  # cleos create account eosio $name $pub $pub
  # cleos wallet import -n zebrawal --private-key $priv

  # enable transfer of tokens between accounts via zebrauser
  cleos set account permission $name active "{\"threshold\" : 1, \"keys\" : [{\"key\": \"$pub\", \"weight\": 1}], \"accounts\" : [{\"permission\":{\"actor\":\"zebrauser\",\"permission\":\"eosio.code\"},\"weight\":1}], \"waits\":[]}}" owner
done
