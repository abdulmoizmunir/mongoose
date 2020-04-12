var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/inventory',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    var itemScheme = new mongoose.Schema({
        name: { type: String, required: true },
        quantity: { type: Number, min: 0, max: 500 },
        lastUpdated: { type: Date, default: Date.now },
    });

    itemScheme.methods.edit = function () {
        this.lastUpdated = new Date();
    }

    var InventoryItem = mongoose.model("InventoryItem", itemScheme);

    var inventory = [
        {
            name: 'Cold compress',
            quantity: 4,
            lastUpdated: new Date(),
        },
        {
            name: 'Sanitizer (100ml)',
            quantity: 1,
            lastUpdated: new Date()
        },
        {
            name: 'Adhesive Bandages',
            quantity: 2,
            lastUpdated: new Date()
        },
        {
            name: 'Sterile gauze rolls',
            quantity: 3,
            lastUpdated: new Date()
        },
        {
            name: 'Hydrocortisone ointment',
            quantity: 5,
            lastUpdated: new Date()
        },
        {
            name: 'Hydrogen peroxide (15ml)',
            quantity: 6,
            lastUpdated: new Date()
        },
    ];


    InventoryItem.collection.insertMany(inventory, function (err, items) {
        if (err) return console.error(err);
        console.log("Number of items inserted: " + items.insertedCount);
    });
});
