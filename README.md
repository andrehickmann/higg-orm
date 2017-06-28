# higg:orm

## Table of contents

- [Introduction](#install)
- [Install](#install)
- [Querying the database](#querying)
- [Contributors](#contributors)
- [Todos](#todos)

## Introduction

A basic db/orm system with support for querying mysql-databases for your TypeScript (ES6) application.

## Install

Installing the package over npm:
 ```
 $ npm install higg-orm --save
 ```
 
## Querying the database

Simple example for making a select-query on an mysql-database.

Importing the needed modules/classes.
```typescript jsx
import {DatabaseAdapter, MysqlConnection, MysqlQuerySelect} from '../index';
```
Defining the connection-details in an simple object.
```typescript jsx
let connDetails ={
    host: 'your_dbhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
};
```
Creating a new adapter for our mysql-database, by simply inject an ``MysqlConnection``  into the adapter and defining a name.
```typescript jsx
let adapter = new DatabaseAdapter(
    new MysqlConnection(connDetails),
    'provider_db'
);
```
Creating a select-query for the mysql-database and querying the users table with a limit of 1.
```typescript jsx
let query = new MysqlQuerySelect();
query
    .from('user')
    .limit(1);
```
Querying the database-adapter with the generated select-object and fetching the result. The ``query()`` function of ``DatabaseAdapter`` is returning a Promise, since the query is async. So we have
  to use the ``.then().catch()`` syntax for getting the result or the error of the request.
```typescript jsx
adapter.query(query)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
      console.log('Error querying database: ' + error);
    });
```

## Contributers

If you like to contribute to the package, feel free to fork the repository and
make a pull-request. The repository can be found on [github](https://github.com/andrehickmann/higg-orm)

## Tests

``` 
npm test
```
  
## Todos

Of course the package is very simple at the moment, there are plenty things to
do:

* writing tests :)
* writing documentation :)
