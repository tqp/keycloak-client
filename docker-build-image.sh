#!/usr/bin/env bash

export IMAGE_TAG=keycloak-client
export IMAGE_VERSION=latest
echo "IMAGE: ${IMAGE_TAG}:${IMAGE_VERSION}"

rm -rf dist
docker build -f Dockerfile -t ${IMAGE_TAG}:${IMAGE_VERSION} .
