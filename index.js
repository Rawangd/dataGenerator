import mongoose from "mongoose";
import {faker} from "@faker-js/faker";
import _ from "lodash";
import {Buyer} from "./models/buyers";
import {Owner} from "./models/Owners";
import RandExp from "randexp";
import {Store} from "./models/stores";
import {Product} from "./models/products";
import {Transaction} from "./models/transactions";
import {Schedule} from "./models/schedule";
import {Command} from "./models/commands";
import {Employee} from "./models/employees";
import {EmpSchedule} from "./models/empSchedule";
import {Staff} from "./models/staff";
import {Token} from "./models/tokens";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const randtoken = require('rand-token');
var randomCoordinates = require('random-coordinates');


var db;
const hash = 'L5R+WUX700nO$|n,V@n~00WCHUoz';

function pickRandom(arr) {
    return arr.filter(() => Math.random() > 0.5)
}

const createProduct = function (StoreId, product) {
    return Product.create(product).then(doc => {

        return Store.findByIdAndUpdate(
            StoreId,
            {
                $push: {
                    products: {
                        // _id:doc._id,
                        name: doc.name
                    }
                }
            },
            {new: true, useFindAndModify: false}
        );
    });
};

const createStore = function (store) {
    return Store.create(store).then(doc => {
        return doc;
    });
};

const createSchedule = function (schedule) {
    return Schedule.create(schedule).then(doc => {
        return doc;
    });
};

const createCommands = function (command) {
    return Command.create(command).then(doc => {
        return doc;
    });
};

const createTransaction = function (transaction) {
    return Transaction.create(transaction).then(doc => {
        return doc;
    });
};

const createEmployee = function (employee) {
    return Employee.create(employee).then(doc => {
        return doc;
    });
};

const createStaff = function (staff) {
    return Staff.create(staff).then(doc => {
        return doc;
    });
};

const createBuyer = function (buyer) {
    return Buyer.create(buyer).then(doc => {
        return doc;
    });
};

const createTokens = function (tokens) {
    return Token.create(tokens).then(doc => {
        return doc;
    });
};

const createempsched = function (EmployeeId, emp) {
    return EmpSchedule.create(emp).then(doc => {

        return Employee.findByIdAndUpdate(
            EmployeeId,
            {
                $push: {
                    empSchedule: {
                        _id: doc._id,
                        //name: doc.name
                    }
                }
            },
            {new: true, useFindAndModify: false}
        );
    });
};

const storeClients = async function () {
    let stores = await Store.find();
    let val2 = await Store.countDocuments()
    let buyer;

    for (let j = 0; j < val2; j++) {
        buyer = await Buyer.find({"stores.storeId": (stores[j]._id)})
        let buyers = [];
        for (let i = 0; i < buyer.length; i++) {

            buyers.push((buyer[i]._id))

        }
        await Store.findByIdAndUpdate(stores[j]._id, {clients: buyers})

    }

}

const storeEmployees = async function () {
    let stores = await Store.find();
    let val2 = await Store.countDocuments()
    let employee;

    for (let j = 0; j < val2; j++) {
        employee = await Employee.find({"storeId": (stores[j]._id)})
        let employees = []

        for (let i = 0; i < employee.length; i++) {
            employees.push(employee[i]._id)

        }
        await Store.findByIdAndUpdate(stores[j]._id, {employees: employees})

    }

}

const productSchedules = async function () {
    let products = await Product.find();
    let val2 = await Product.countDocuments()
    let schedule;

    for (let j = 0; j < val2; j++) {
        schedule = await Schedule.find({"productId": (products[j]._id)})
        let schedules = []
        for (let i = 0; i < schedule.length; i++) {
            schedules.push(schedule[i]._id)

        }
        await Product.findByIdAndUpdate(products[j]._id, {schedules: schedules})

    }

}

const generateBuyers = async function (noBuyers) {
    let pwd = '$2a$12$bVzr8JEVHT0w2gXNtLlHrefXV21BK0tIIOsMWbSx9GPjhrJDoxF4O';
    let fav = await Product.find();


    for (let i = 0; i < noBuyers; i++) {
        let tlf = new RandExp(/^[7|2|5|3|4|9][0-9]{7}$/).gen();
        let store = await Store.aggregate([{$sample: {size: 4}}]);
        let favp = []
        for (let i = 0; i < 20; i++) {
            favp.push(fav[i].name)
        }

        var Buyer = await createBuyer({
            name: faker.name.findName(),
            points: faker.datatype.number(),
            resetCode: {
                code: faker.datatype.number(),
                time: faker.date.soon(),
            },
            email: faker.internet.email(),
            phone: tlf,
            code: faker.datatype.number(),
            password: pwd,
            timeRange: faker.datatype.number({max: 60}),
            favoriteProducts: pickRandom(favp),
            verified: faker.datatype.boolean(),
            stores: [

                {
                    storeId: store[0]._id,
                    balance: faker.random.numeric(),
                    sellerName: store[0].sellerName,
                    ratings: store[0].totalPoints,
                },
                {
                    storeId: store[1]._id,
                    balance: faker.random.numeric(),
                    sellerName: store[1].sellerName,
                    ratings: store[0].totalPoints,
                },
                {
                    storeId: store[2]._id,
                    balance: faker.random.numeric(),
                    sellerName: store[2].sellerName,
                    ratings: store[0].totalPoints,
                }

            ],
        });
        //console.log(Buyer)


    }
};


async function generateOwners(noOwners) {

    var docs = _.times(noOwners, function (n) {
        let tlf = new RandExp(/^[7|2|5|3|4|9][0-9]{7}$/).gen();
        let Cin = new RandExp(/^[1|0][0-9]{7}$/).gen();

        return {

            name: faker.name.findName(),
            cin: Cin,
            phone: tlf,
            email: faker.internet.email(),
            feesPercent: faker.datatype.float({min: 0, max: 100, precision: 0.01}),
            logoUrl: faker.image.imageUrl(),
            logoHash: hash,//use image-hash

            verified: faker.datatype.boolean(),
        }


    })

    return Promise.all([Owner.insertMany(docs), {}]);
}


const generateStores = async function (noStores) {

    for (let i = 0; i < noStores; i++) {

        let tlf = new RandExp(/^[7|2|5|3|4|9][0-9]{7}$/).gen();
        let ownerid = await Owner.aggregate([{$sample: {size: 1}}]);


        var store = await createStore({
            storeImage: faker.image.imageUrl(),
            ownerId: ownerid[0]._id,
            storeName: faker.company.companyName(),
            address: faker.address.streetAddress(),
            maxDelay: faker.random.numeric(),
            storeImageHash: hash,
            location: {
                coordinates: [randomCoordinates()],
            },
            phone: tlf,
            workingDays: {
                open: faker.date.weekday(),
                close: faker.date.weekday(),

            },
            ratings: {
                reviewers: faker.random.numeric(),
                totalPoints: faker.random.numeric(),
            },
        });

        for (let i = 0; i < faker.random.numeric(1); i++) {
            store = await createProduct(store._id, {
                name: faker.commerce.product(),
                sellingByPiece: faker.datatype.boolean(),
                category: faker.random.numeric(),
                weight: faker.random.numeric(),
                price: faker.commerce.price(),
                sellerId: store._id,
                badges: ["badge1", "badge2", "badge3"],
                ingredients: faker.commerce.productMaterial(),
                available: faker.datatype.boolean(),
                imageUrl: faker.image.food(),
                imageHash: hash,
            })
        }

    }


}


const generateSchedules = async function (noSched) {
    let date = new Date();

    for (let i = 0; i < noSched; i++) {
        let productid = await Product.aggregate([{$sample: {size: 5}}]);
        let sellerid = await Store.aggregate([{$sample: {size: 5}}]);
        let date1 = faker.date.future();
        let difference = date1.getTime() - date.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

        var Schedule = await createSchedule({
            qty: faker.random.numeric(),
            productId: productid[0]._id,
            sellerId: sellerid[0]._id,
            dateTime: date1,
            left: TotalDays,
            suspended: faker.datatype.boolean(),
            ready: faker.datatype.boolean(),

        });

        //console.log("\n>> product :\n", product)
    }

}


const generateCommandsAndTransactions = async function (noCT) {
    try {
        let commands = []
        let transactions = []
        for (let i = 0; i < noCT; i++) {

            let seller = await Store.aggregate([{$sample: {size: 1}}]);
            let buyer = await Buyer.aggregate([{$sample: {size: 1}}]);
            let product = await Product.aggregate([{$sample: {size: 5}}]);
            let stard = faker.date.soon()
            let endd = faker.date.future()
            var command = createCommands({

                products: [
                    {
                        productId: product[0]._id,
                        productName: product[0].name,
                        qty: faker.random.numeric(1),
                        price: product[0].price
                    },
                    {
                        productId: product[1]._id,
                        productName: product[1].name,
                        qty: faker.random.numeric(1),
                        price: product[1].price
                    },
                    {
                        productId: product[2]._id,
                        productName: product[2].name,
                        qty: faker.random.numeric(1),
                        price: product[2].price
                    },
                    {
                        productId: product[3]._id,
                        productName: product[3].name,
                        qty: faker.random.numeric(1),
                        price: product[3].price
                    },
                ],
                sellerId: seller[0]._id,
                buyerId: buyer[0]._id,
                totalPrice: faker.random.numeric(3),
                startTime: stard,
                endTime: endd,
                delivered: faker.datatype.boolean(),
                deliveredAt: faker.date.between('2022-09-01T00:00:00.000Z', '2023-09-01T00:00:00.000Z'),
                confirmedAt: faker.date.soon(),
                rejectedAt: faker.date.between('2022-09-01T00:00:00.000Z', '2023-09-01T00:00:00.000Z'),
                notes: faker.lorem.sentence(),
                canceledAt: faker.date.between('2022-09-01T00:00:00.000Z', '2023-09-01T00:00:00.000Z'),
                status: faker.random.numeric(),

            })

            commands.push(command)


            var transaction = createTransaction({


                sender: seller[0].storeName,
                receiver: buyer[0].name,
                fee: faker.datatype.float({min: 0, max: 1, precision: 0.01}),
                amount: faker.random.numeric(),
                type: faker.random.numeric(),
                description: faker.lorem.sentence(),
            })
            transactions.push(transaction)


        }
        await Promise.all(transactions)
        return Promise.all(commands)
        //console.log(commands)

    } catch (error) {
        console.log("error")
    }
}


async function generateEmployees(noEmployees) {
    try {
        var employees = [];
        for (let i = 0; i < noEmployees; i++) {

            let tlf = new RandExp(/^[7|2|5|3|4|9][0-9]{7}$/).gen();
            let store = await Store.aggregate([{$sample: {size: 1}}]);

            var employee = createEmployee({

                name: faker.name.findName(),
                photoUrl: faker.image.imageUrl(),
                password: faker.internet.password(),
                resetCode: {
                    code: faker.datatype.number(),
                    time: faker.date.soon(),
                },
                phone: tlf,
                role: faker.random.numeric(1),
                position: faker.lorem.word(),
                grade: faker.lorem.word(),
                salary: faker.random.numeric(3),
                verified: faker.datatype.boolean(),
                advances: [faker.random.numeric(1), faker.random.numeric(1), faker.random.numeric(1)],
                points: faker.random.numeric(),
                isActive: faker.datatype.boolean(),
                storeId: store[0]._id,


            })
            //employees.push(employee)
            employee = createempsched(employee._id, {
                startTime: "8 AM",
                endTime: "6 PM",
                entries: [
                    {
                        enter: faker.date.soon(),
                        exit: faker.date.soon(),
                    },
                ],
                maxDelay: faker.datatype.number({max: 60}), // In minutes
            })
            employees.push(employee)

        }

    } catch (error) {
        console.log("error")
    }

    return Promise.all(employees);
}


async function generateStaff(noStaff) {
    try {
        for (let i = 0; i < noStaff; i++) {
            var staff = createStaff({

                imageUrl: faker.image.imageUrl(),
                imageHash: hash,
                name: faker.name.findName(),
                //department: String
            })

        }

    } catch (error) {
        console.log("error")
    }

}


const generateTokens = async function (noTokens) {
    var tokens = []
    for (let i = 0; i < noTokens; i++) {

        var token = createTokens({

            token: randtoken.generate(30),
            ip: faker.internet.ip(),

        });
        tokens.push(token)

        //console.log(token)
    }
    return Promise.all(tokens)
}


async function init() {

    await storeClients();
    await storeEmployees();
    await productSchedules();


}

const question1 = () => {
    return new Promise((resolve, reject) => {
        readline.question('owners number  ', async (answer) => {
            await generateOwners(answer)
            resolve()
        })
    })
}

const question2 = () => {
    return new Promise((resolve, reject) => {
        readline.question('stores number ', async (answer) => {
            await generateStores(answer)
            resolve()
        })
    })
}

const question3 = () => {
    return new Promise((resolve, reject) => {
        readline.question('buyers number ', async (answer) => {
            await generateBuyers(answer)
            resolve()
        })
    })
}

const question4 = () => {
    return new Promise((resolve, reject) => {
        readline.question('employees number ', async (answer) => {
            await generateEmployees(answer)
            resolve()
        })
    })
}

const question5 = () => {
    return new Promise((resolve, reject) => {
        readline.question('schedules number ', async (answer) => {
            await generateSchedules(answer)
            resolve()
        })
    })
}

const question6 = () => {
    return new Promise((resolve, reject) => {
        readline.question('commands number ', async (answer) => {
            await generateCommandsAndTransactions(answer)
            resolve()
        })
    })
}

const question7 = () => {
    return new Promise((resolve, reject) => {
        readline.question('staff number ', async (answer) => {
            await generateStaff(answer)
            resolve()
        })
    })
}

const question8 = () => {
    return new Promise((resolve, reject) => {
        readline.question('tokens number ', async (answer) => {
            await generateTokens(answer)
            resolve()
        })
    })
}

async function CreateDB() {
    try {
        db = mongoose.connection;
        console.log('connectiong to database...');
        await mongoose.connect('mongodb://localhost:27017/newdb', {useNewUrlParser: true});
        console.log('database connected successfully...');

        await question1()
        await question2()
        await question3()
        await question4()
        await question5()
        await question6()
        await question7()
        await question8()
        await init();
        console.log('end')
    } catch (err) {
        console.log(err);
    }

}

CreateDB();

