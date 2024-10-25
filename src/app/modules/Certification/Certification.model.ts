import { Schema, model } from 'mongoose';
import { CertificationModel, ICertification } from './Certification.interface';

// Define Certification Schema
const CertificationSchema: Schema<ICertification, CertificationModel> =
  new Schema<ICertification, CertificationModel>(
    {
      name: { type: String, required: true },
      issuingOrganization: { type: String, required: true },
      issueDate: { type: Date, required: true },
      expirationDate: { type: Date },
      credentialUrl: { type: String },
      isDeleted: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    },
  );

// Query Middleware
CertificationSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

CertificationSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

CertificationSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
CertificationSchema.statics.isCertificationExists = async function (
  id: string,
) {
  const existingCertification = await Certification.findById(id);
  return existingCertification;
};

// Create and export the Certification model
export const Certification = model<ICertification, CertificationModel>(
  'Certification',
  CertificationSchema,
);
