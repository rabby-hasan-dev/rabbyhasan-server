import { Schema, model } from 'mongoose';
import { AchievementModel, IAchievement } from './achievement.interface';



// Define Achievement Schema
const AchievementSchema: Schema<IAchievement, AchievementModel> = new Schema<IAchievement, AchievementModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: [{ type: String }],
  isDeleted: { type: Boolean, default: false },

});


// Query Middleware
AchievementSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

AchievementSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

AchievementSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
AchievementSchema.statics.isAchievementExists = async function (id: string) {
  const existingAchievement = await Achievement.findById(id);
  return existingAchievement;
};

export const Achievement = model<IAchievement, AchievementModel>('Achievement', AchievementSchema);
