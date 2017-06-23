import { expect } from 'chai';
import {MysqlDatabaseAdapter, DatabaseAdapter, MysqlConnection} from '../index';
import {ConnectionInterface} from "../src/ConnectionInterface";
import {MysqlQuerySelect} from "../src/MysqlQuerySelect";

let connDetails ={
    host: '192.168.101.120',
    user: 'debitcontrol_app',
    password: 'Higg1983',
    database: 'advoport_provider_240260'
};

let adapter = new MysqlDatabaseAdapter(
    new DatabaseAdapter(
        new MysqlConnection(connDetails),
        'provider_db'
    )
);

let connection = new Promise(function(resolve, reject) {
    try {
        let connection = adapter.connect();
        resolve(connection);
    } catch (error) {
        reject(error);
    }

});

connection.then(function(connection: ConnectionInterface) {
    let query = new MysqlQuerySelect();
    query.from('user').limit(1,0);
    console.log(query.assemble());
    adapter.query(query);
}).catch(function(error){
    console.log(error);
});
