const { Users } = require("../database/seed");
exports.fetchAllUsers = () => {
  return Users.find().then((userList) => {
    return userList;
  });
};

exports.fetchIndividualUserByUsername = (username) => {
  const regEx = /^[0-9a-zA-Z]+$/;
  if (username.match(regEx)) {
    return Users.find({username: username}).then((individualUser) => {
      if (individualUser.length === 0) {
        return Promise.reject({status: 404, msg: "User not found"})
      }
      return individualUser;
    })
  } else {
    return Promise.reject({status: 400, msg: "Invalid username"})
  }
}

exports.updateUserByUsername = (username, preferences, postcode, password) => {
  if (preferences === undefined || password === undefined || postcode === undefined) {
    return Promise.reject({status: 400, msg: "Invalid key"})
  }
  const regEx = /^[0-9a-zA-Z]+$/;
  if (username.match(regEx) && Array.isArray(preferences) && typeof(password)==="string" && typeof(postcode)=== "string") {
    return Users.findOneAndUpdate(
      {username},
      {$set: {preferences: preferences, password: password, postcode: postcode}},
      {returnOriginal: false}
      ).then((updatedUser) => {
        if (updatedUser === null) {
          return Promise.reject({status: 404, msg: "User not found"})
        }
      return [updatedUser];
    })
  } else if (!username.match(regEx)) {
    return Promise.reject({status: 400, msg: "Invalid username"})
  } else {
    return Promise.reject({status: 400, msg: "Invalid body"})
  }
}