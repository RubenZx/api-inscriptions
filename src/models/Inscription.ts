import { getModelForClass, prop } from "@typegoose/typegoose";

class Inscription {
  @prop({ required: true })
  public firstname!: string;

  @prop({ required: true })
  public lastname!: string;

  @prop()
  public age: number | undefined;

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

  @prop({ required: true })
  public end!: Date;
}

export default getModelForClass(Inscription);
