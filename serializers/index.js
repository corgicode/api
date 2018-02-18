// https://stackoverflow.com/questions/35906800/express-how-to-implement-the-json-api
const to_jsonapi = function (result = {}, type, fn) {
  const datajson = [];
  if (Array.isArray(result)) {
    result.forEach(function(item) {
      datajson.push({
        type: type,
        id: item._id,
        attributes: fn ? fn(item) : item,
        relationships: {},
      });
    });
  } else if (typeof result === 'object' && result !== null) {
    // Happens when there is only one item
    datajson.push({
      type: type,
      id: result._id || result.id,
      attributes: fn ? fn(result) : result,
      relationships: {},
    });
  } else {
    datajson.push({
      type: type,
    });
  }
  return {
    data: datajson,
  };
};

const challenges = function (docs, fn) {
  return to_jsonapi(docs, 'challenges', fn);
}

const users = function (docs, fn) {
  return to_jsonapi(docs, 'users', fn);
}

const profile = function (docs, fn) {
  return to_jsonapi(docs, 'users', fn);
}

const submit = function (docs, fn) {
  return to_jsonapi(docs, 'submit', fn);
}

const error = function({ title = 'Unrecognized server error', source, detail, status = 500, err }) {
  return {
    errors: [
      {
        status,
        source,
        title,
        detail,
        err,
      }
    ]
  };
};

const errors = function (err, meta) {
  const errors = [];
  errors.push({
      title: err._message,
      detail: err.message,
  });
  err.errors = err.errors || {};
  Object.keys(err.errors).forEach(function(key) {
    errors.push({
      detail: err.errors[key].message,
      status: 500,
      source: {
        pointer: `/data/attributes/${key}`,
      },
      meta: meta ? err.errors[key] : undefined,
    });
  });

  return {
    errors,
  }
};

module.exports = {
  challenges,
  users,
  error,
  errors,
  submit,
  profile,
};
