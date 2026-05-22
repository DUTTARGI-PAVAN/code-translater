import History from "../models/History.model.js";

export const createHistoryEntry = async (data) => {
  return await History.create(data);
};

export const getUserHistory = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [entries, totalEntries] = await Promise.all([
    History.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    History.countDocuments({ userId }),
  ]);
  return {
    entries,
    totalEntries,
    totalPages: Math.ceil(totalEntries / limit),
    currentPage: page,
  };
};

export const getHistoryEntryById = async (id, userId) => {
  return await History.findOne({ _id: id, userId });
};

export const deleteHistoryEntryById = async (id, userId) => {
  return await History.findOneAndDelete({ _id: id, userId });
};

export const clearUserHistory = async (userId) => {
  return await History.deleteMany({ userId });
};