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

let select = new MysqlQuerySelect();
select
    .from('user')
    .where("username LIKE 'a%'")
    .limit(10,0);
console.log(select.assemble());
adapter.query(select)
    .then(result => {
        for (let i = 0; i < result.count(); i++) {
            console.log('Zeile ' + (i+1) + ':');
            console.log(result.fetchRow());
        }
    })
    .catch(error => {
      console.log('Error during querying mysql-database: ' + error);
    });
