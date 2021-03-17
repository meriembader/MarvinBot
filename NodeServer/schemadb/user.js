module.exports = mongoose => {
    const user = mongoose.model(
      "user",
      mongoose.user(
        {
          name: String,
          surname: String,
          mail: String,
          password: String
        },
        { timestamps: true }
      )
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const user = mongoose.model("user", schema);
    return user;
  };