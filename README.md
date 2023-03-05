# Confidant

A web app that holds secrets.

## Concept

I want to create a simple app that acts like a password manager, but it's also useful to store secrets in a text format like _markdown_.

The app has a key-value data model, where the key represents a context, and the value represents a text document that can contain any type of secret information.

The API is as simple as a pair of get/set endpoints that encrypt and decrypt content by context using a master password.

## Stack

I'm creating a _qwik_ app ~~with a _postrges_ database~~, and using _docker_ to deploy the stack.

Actually, I think the best option for persisting data would be something like a json-based file storage or a sqlite database.

## Data

I need to save my data in a data structure like the following:

- Id
- Name
- Content
- Iv
- Salt

Where _iv_ and _salt_ are the informations needed to decipher the _content_, while _id_ and _name_ are plain content.