// https://stackoverflow.com/questions/35906800/express-how-to-implement-the-json-api
const to_jsonapi = function (result, type, fn) {
    const datajson = [];
    if (Array.isArray(result)) {
      result.forEach(function(item) {
        datajson.push({
          "type": type,
          "id": item._id,
          "attributes": fn ? fn(item) : item,
        });
      });
    } else if (typeof result === "object") {
      // Happens when there is only one item
      datajson.push({
        "type": type,
        "id": result._id,
        "attributes": fn ? fn(result) : result,
      });
    } else {
      datajson.push({
        "type": type
      });
    }
    return {
      "data": datajson
    };
  }

module.exports = {
    to_jsonapi,
};
