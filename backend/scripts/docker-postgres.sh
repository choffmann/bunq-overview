#!/usr/bin/env bash

docker run --name bunq-db -e POSTGRES_PASSWORD=geheim -e POSTGRES_DB=bunq -p 5432:5432 -d postgres