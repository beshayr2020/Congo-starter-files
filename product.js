const fs = require('fs');
const short = require('short-uuid');
const translator = short();


function readWriteFile(product) {
    fs.readFile("./products.json", "utf8", (error, fileData) => {
        if (error) throw error;
        let data = JSON.parse(fileData);
        data.push(product);

        fs.writeFile("./products.json", JSON.stringify(data, null, 2), (err) => {
            if (err) throw err;
            console.log("Successfully Wrote File");
        })

    });
};

let product = {
    "uid": translator.new(),
    "title": "UNCLE BEN'S Ready Whole Grain Medley: Brown Rice & Wild Rice, Ready to Heat, 8.5 Oz Pouches, Pack of 6",
    "price": 11.94,
    "category": "food",
    "keywords": [
        "food",
        "rice",
        "dinner",
        "quick meals",
        "microwave"
    ],
    "features": [
        "Microwave rice in just 90 seconds",
        "Delicious medley of brown rice and wild rice",
        "Convenient pouch eliminates prep and cleanup",
        "No trans fat, no saturated fat, no cholesterol"
    ],
    "description": "Uncle Ben's Whole Grain Medley: Brown & Wild Rice is a savory mix of brown rice, wild rice and red rice, perfectly seasoned with herbs and spices. This flavorful whole grain medley gives your family the goodness of 100% whole grains and meets the whole grains full daily requirement, in just one serving. Uncle Ben's can help you with a great dinner solution, ready in no time. If you’ve got 90 seconds, then you have the beginnings of a great meal. Plus, the convenient microwaveable pouch eliminates prep and cleanup, so cooking is even quicker and easier. ‡USDA Dietary Guidelines recommend eating 3 servings (48g) or more of whole grains daily.",
    "image": "https://fa74d61d848a20b729bb-0251b36b713060ab3e0e8321940e01ff.ssl.cf2.rackcdn.com/0054800233350_CF_default_default_large.jpeg"
};

readWriteFile(product);
