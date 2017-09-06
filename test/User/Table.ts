import { TableInterface } from "../../src/Database/Table/Interface";
import { Model } from "../../src/Model";
import { ModelInterface } from "../../src/Model/Interface";

export class UserTable {

    private table: TableInterface;

    constructor(table: TableInterface) {
        this.table = table;
    }

    getUsersPerName(name: string): Promise<Array<ModelInterface>> {
        return new Promise((resolve, reject) => {
            let adapter = this.table.adapter();
            let select = adapter.select().from('user').where("user.username LIKE ?", [name]);
            let data = new Array();
            return adapter.query(select)
                .then(result => {
                    if (!result) {
                        reject(new Error("Error getting usersPerName."));
                    } else {
                        for (let i = 0; i < result.count(); i++) {
                            data.push(new Model(result.fetchRow(), this.table));
                        }
                        resolve(data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        })
    }
}