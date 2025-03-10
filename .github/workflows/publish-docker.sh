#!/usr/bin/env bash

# Determine the tag based on the ref
if [[ $GITHUB_REF == refs/tags/* ]]; then
  # For tag pushes
  TAG="${GITHUB_REF#refs/tags/}"
elif [[ $GITHUB_REF == refs/heads/main ]]; then
  # For main branch pushes
  TAG="latest"
else
  # For other branches (shouldn't happen with current config)
  TAG="dev"
fi

# No need to login here as it's handled in the workflow

sudo docker buildx create --use
sudo docker buildx build \
    -t "ghcr.io/xchpay/shopify-app:${TAG}" \
    --platform linux/amd64,linux/arm64,linux/arm/v7 \
    --push .
    