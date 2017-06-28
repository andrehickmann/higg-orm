import { expect } from 'chai';
import {DatabaseAdapter, MysqlConnection, MysqlQuerySelect} from '../index';

let connDetails ={
    host: '192.168.101.120',
    user: 'debitcontrol_app',
    password: 'Higg1983',
    database: 'advoport_provider_240260'
};

let adapter = new DatabaseAdapter(
    new MysqlConnection(connDetails),
    'provider_db'
);

let query = new MysqlQuerySelect();
query
    .from('user')
    .limit(1,0);
adapter.query(query)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
      console.log('Error during querying mysql-database: ' + error);
    });
