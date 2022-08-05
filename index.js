import mongoose from "mongoose";
import {faker} from "@faker-js/faker";
import _ from "lodash";
import {Buyer} from "./models/buyers";
import {Owner} from "./models/owners";


var noOfRecords = 10;
var db;

CreateDB();


async function CreateDB() {
    try {

        db = mongoose.connection;
        console.log('connectiong to database...');
        await mongoose.connect('mongodb://localhost:27017/testData');
        console.log('database connected successfully...');
        await init(noOfRecords);

    } catch (err) {
        console.log(err);
    }


};


function generateBuyers(numberOfBuyers) {
    let favoriteProduct = [] ;
    for (let i = 0; i < faker.datatype.number(); ++i) {
        favoriteProduct.push(faker.commerce.product())
    }

    var docs = _.times(numberOfBuyers, function (n) {
        return {

            name: faker.name.findName(),
            points: faker.datatype.number(),
            resetCode: _.times(faker.datatype.number(), faker.random.word),
            email: faker.internet.email(),
            phone: faker.phone.number('+216 ## ### ###'),
            code: faker.datatype.string(),
            password: faker.internet.password(7, true),
            timeRange: faker.datatype.number(),
            favoriteProducts: favoriteProduct,
            verified: faker.datatype.boolean(),
            store: _.times(faker.datatype.number(),
                function (n) {
                    return {
                        _id: faker.datatype.uuid(),
                        balance: faker.datatype.number(),
                        sellerName: faker.internet.userName(),
                        ratings: faker.datatype.number(),
                    }
                }),


        };
    });

    return Promise.all([Buyer.insertMany(docs), {}]);

}

async function generateOwners(noOwners) {
    var docs = _.times(noOwners, function (n) {
        return {
            name: faker.name.findName(),
            cin: faker.random.numeric(8),
            phone: faker.phone.number('+216 ## ### ###'),
            email: faker.internet.email(),
            feesPercent: faker.datatype.float({min: 0, max: 100, precision: 0.01}),
            logoUrl: faker.image.imageUrl(),
            logoHash: faker.image.dataUri(),
            maxEmployDelay: faker.datatype.number(),
            pack: faker.datatype.number(),
            verified: faker.datatype.boolean(),
        }
    })
    return Promise.all([Owner.insertMany(docs), {}]);
}

async function init(noOfRecords) {


    await generateBuyers(noOfRecords).then((docs) => {
        mongoose.connection.close();
        console.log('Buyers successfully inserted');
    });
    await generateOwners(noOfRecords).then((docs) => {
        mongoose.connection.close();
        console.log('Owners successfully inserted');
    });
    console.log(`Created Collections with ${noOfRecords}  finished.`);


}