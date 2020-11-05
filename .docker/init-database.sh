#!/bin/bash

set -e
psql -v --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE SCHEMA desafio AUTHORIZATION $POSTGRES_USER
EOSQL
