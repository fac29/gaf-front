# GAF Frontend

![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Node.js](https://img.shields.io/badge/TS--Node-blue)
![License](https://img.shields.io/badge/License-MIT-blue)

An ecommerce web app. Built with typescript, React and node.

## Table of Contents

- [Functionality](#functionality)
- [Installation](#installation)
- [Usage](#usage)

## Functionality

- See all products
- Search for an individual product
- Add a product to the cart
- remove a product from the cart
- Log into your user account
- register a new user account

## Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/fac29/gaf-front.git
    cd gaf-front
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

## Usage

### Running the Server

To start the server, use the following command:

```sh
npm run dev
```

# Useful CDK commands:

### Deploy

cdk bootstrap
cdk bootstrap aws://788798427985/us-west-2
cdk deploy

### List stacks

aws cloudformation list-stacks --query "StackSummaries[?StackName=='CDKToolkit']"

### Update stack

cdk synth
cdk deploy

### Delete the CDK context file

rm cdk.context.json

### Delete the bootstrap bucket

cdk bootstrap --destroy

aws s3 rb s3://cdk-hnb659fds-assets-788798427985-eu-west-2 --force


### Delete stack

aws cloudformation delete-stack --stack-name CDKToolkit
