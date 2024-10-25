import { Schema, model } from 'mongoose';
import { ClientModel, IClient } from './client.interface';

// Define Client Schema
const ClientSchema: Schema<IClient, ClientModel> = new Schema<
  IClient,
  ClientModel
>(
  {
    name: { type: String, required: true },
    website: { type: String },
    contactEmail: { type: String, required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Query Middleware
ClientSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ClientSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ClientSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
ClientSchema.statics.isClientExists = async function (id: string) {
  const existingClient = await Client.findById(id);
  return existingClient;
};

// Create and export the Client model
export const Client = model<IClient, ClientModel>('Client', ClientSchema);
