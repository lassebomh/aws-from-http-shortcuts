# AWS from HTTP Shortcuts
This is a template to create canonical AWS requests with [JavaScript macros](https://http-shortcuts.rmy.ch/scripting) in the app [HTTP Shortcuts](https://http-shortcuts.rmy.ch/scripting#text-processing).

# Setup

## Get your AWS credentials
Go into your IAM and get your secret access key and access key ID. Running the current example without modification requires that the user has access to EC2. We will be running the `DescribeRegions` action that displays all available regions.

## Create required variables
You will need 5 static variables called:
 - `AWS_SECRET_ACCESS_KEY`
 - `AWS_ACCESS_KEY_ID`
 - `AWS_REQUEST_URL`
 - `AWS_REQUEST_AUTHORIZATION`
 - `AWS_REQUEST_AMZDATE`

Set `AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID` to the credentials that you retrieved from the previous step.

## Create a Shortcut to make the request
Create a script shortcut and insert the code from `http-shortcut-code.js`. This shortcut will set the `AWS_REQUEST` variables.

## Create a Shortcut to send the request
Create a regular HTTP shortcut. Set the URL to the `AWS_REQUEST_URL` variable (and remember to remove `http://` from the field). Now you need to add two headers:
 - `Authorization` set to the `AWS_REQUEST_AUTHORIZATION` variable
 - `x-amz-date` set to the `AWS_REQUEST_XAMZDATE` variable

## Create a Multi-Shortcut to create and send a request
Create a Multi-Shortcut that triggers the first and second shortcut we created (in that order).

# Testing on a desktop
`npm run start` runs the example with polyfills for missing functions. Variables are polyfilled with environment variables - so set `AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID` before running.