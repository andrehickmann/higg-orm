import { DatabaseAdapter, MysqlConnection } from '../index';
import { ConnectionDetail } from "../src/Database/Connection/Detail";
import { MysqlConnectionDetail } from "../src/Database/Adapter/Mysql/Connection/Detail";

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

let select = adapter.select(['user.username', 'lastLogin'])
    .from('user')
    .where('?? LIKE ?', ['username', '%a'])
    .limit(10,0)
    .order('username', 'DESC');
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
