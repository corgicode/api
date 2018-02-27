const filename = `${__filename.slice(__dirname.length + 1, -3)}`;

const up = () => {
    console.log(`Running up for ${filename}`);
    // db.collection.update(query, update, {upsert: true})
    console.log(`Finishing up for ${filename}`);
}

const down = () => {
    return;
}

module.exports = {
    up,
    down,
}
