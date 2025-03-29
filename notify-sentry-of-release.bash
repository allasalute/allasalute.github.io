#!/bin/bash -ex

# Create a Sentry API key with project:write permissions from under your Sentry organization's settings.
# Set the following environment variables.

# SENTRY_TOKEN         (Required) Sentry Token
# SENTRY_ORGANIZATION    (Optional) Slug (aka name) for the Sentry organization.
#                           If not provided, this script assumes Sentry matches Bitbucket organization.
#                           Example: "demo"
# SENTRY_PROJECT         (Optional) Slug (aka name) for the Sentry project.
#                           If not provided, this script assumes Sentry matches Bitbucket repository.
#                           Example: "ZeroDivisionError"
# BITBUCKET_COMMIT       (Provided) Commit SHA that triggered the build.

if [ -z "${SENTRY_ORGANIZATION}" ]; then
    SENTRY_ORGANIZATION=${BITBUCKET_REPO_OWNER}
fi
if [ -z "${SENTRY_PROJECT}" ]; then
    SENTRY_PROJECT=${BITBUCKET_REPO_SLUG}
fi

REPO="3sidedcube/uos-abreast-of-health-website"
VERSION=$(npm run version --silent)
ENVIRONMENT=$1

if [ $1 = "test" ]
then
  URL="https://allasalute.github.io/"
fi

if [ $1 = "staging" ]
then
  URL="https://allasalute.github.io/"
fi

if [ $1 = "production" ]
then
  URL="https://allasalute.github.io/"
fi

curl https://sentry.io/api/0/organizations/${SENTRY_ORGANIZATION}/releases/ \
    -H "Authorization: Bearer ${SENTRY_TOKEN}" \
    -X POST \
    -H "Content-Type:application/json" \
    -d "{\"version\":\"${VERSION}\",\"refs\":[{\"repository\":\"${REPO}\",\"commit\":\"${BITBUCKET_COMMIT}\"}],\"projects\": [\"${SENTRY_PROJECT}\"]}"

curl https://sentry.io/api/0/organizations/${SENTRY_ORGANIZATION}/releases/${VERSION}/deploys/ \
    -H "Authorization: Bearer ${SENTRY_TOKEN}" \
    -X POST \
    -H "Content-Type:application/json" \
    -d "{\"environment\":\"${ENVIRONMENT}\",\"url\":\"${URL}\"}"
