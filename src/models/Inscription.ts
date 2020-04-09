import { getModelForClass, prop } from "@typegoose/typegoose";

class Inscription {
  @prop({
    required: true,
    trim: true,
    minlength: 4,
  })
  public firstname!: string;

  @prop({
    required: true,
    trim: true,
    minlength: 4,
  })
  public lastname!: string;

  @prop({
    required: true,
    min: 18,
    max: 99,
  })
  public age!: number;

  @prop({
    required: true,
    unique: true,
    validate: {
      validator: (email) =>
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
          email
        ),
      message: "Invalid email",
    },
  })
  public email!: string;

  @prop({ required: true })
  public ticket!: boolean;

  @prop({ required: true })
  public start!: Date;

  @prop({
    required: true,
    validate: {
      validator: function (this: Inscription, endDate) {
        return this.start <= endDate;
      },
    },
  })
  public end!: Date;
}

export default getModelForClass(Inscription);
