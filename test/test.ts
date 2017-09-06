import { DatabaseAdapter, MysqlConnection } from '../index';
import { ConnectionDetail } from "../src/Database/Connection/Detail";
import { MysqlConnectionDetail } from "../src/Database/Adapter/Mysql/Connection/Detail";
import {UserTable} from "./User/Table";
import {Table} from "../src/Database/Table";

let adapter = new DatabaseAdapter(
    new MysqlConnection(
        new MysqlConnectionDetail(
            new ConnectionDetail(
                '192.168.101.120',
                'root',
                'ukarha05',
                'advoport_provider_240260'
            )
        )
    ),
    'provider_db'
);

let userTable = new UserTable(new Table('user', adapter));

userTable.getUsersPerName("%hickmann%")
    .then(result => {
        console.log(result);
    })
    .catch(error => {
      console.log('Error during querying mysql-database: ' + error);
    });
